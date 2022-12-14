import { Application, Router, createJWT, JWTPayload, JWTHeader, ethers, verifyJWT } from './deps.ts';
import { RAVEN_API_PORT, RAVEN_API_JWT_SECRET } from './env.ts'


const router = new Router();

const JWT_SETTINGS: JWTHeader = { alg: "HS512", typ: "JWT" };

const JWT_KEY = await crypto.subtle.importKey(
  "raw",
  new TextEncoder().encode(RAVEN_API_JWT_SECRET),
  { name: "HMAC", hash: "SHA-512" },
  true,
  ["sign", "verify"],
);


router.get('/', (context) => {
  context.response.body = { msg: 'RAVEN API' };
});

router.get('/:address/nonce', async (context) => {

  const address = context?.params?.address;

  if (!ethers.utils.isAddress(address)) {
    // bad request
    context.response.status = 400;
    context.response.body = { error: 'Invalid address' };
    return;
  }

  const uuid = crypto.randomUUID();
  const payload: JWTPayload = {
    iss: "raven-api",
    sub: "nonce-for-verify-wallet",
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + (60 * 10),    // expiration 10 min
    address,
    uuid,
  };
  const nonce = await createJWT(JWT_SETTINGS, payload, JWT_KEY);
  context.response.body = { nonce, payload };
});

router.post('/:address/verify', async (context) => {
  const address = context?.params?.address;
  const jsonBody = await context.request.body({ type: "json" });
  const { signature, nonce } = await jsonBody.value;

  if (!ethers.utils.isAddress(address)) {
    // bad request
    context.response.status = 400;
    context.response.body = { error: 'Invalid address' };
    return;
  }

  if (!signature) {
    // bad request
    context.response.status = 400;
    context.response.body = { error: 'Missing signature' };
    return;
  }

  if (!nonce) {
    // bad request
    context.response.status = 400;
    context.response.body = { error: 'Missing nonce' };
    return;
  }

  // nonce is JWT
  // So check JWT first
  let jwtPayload: JWTPayload;

  try {
    jwtPayload = await verifyJWT(nonce, JWT_KEY,);

    if (jwtPayload?.address?.toString().toLowerCase() !== address.toLowerCase()) {
      // bad request
      context.response.status = 400;
      context.response.body = { error: 'Invalid nonce' };
      return;
    }

  } catch (error) {
    // bad request
    context.response.status = 400;
    context.response.body = { error: `Invalid nonce`, msg: error.message };
    return;
  }

  const addressFromSignature = ethers.utils.verifyMessage(nonce, signature);

  if (addressFromSignature?.toLowerCase() !== address.toLowerCase()) {
    // bad request
    context.response.status = 400;
    context.response.body = { error: 'Invalid signature' };
    return;
  }

  // all good
  // sign a new JWT for business

  const payload: JWTPayload = {
    iss: "raven-api",
    sub: "business",
    iat: Math.floor(Date.now() / 1000),
    // expiration 7 days
    exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 7),
    address,
    jti: crypto.randomUUID(),
  };

  const token = await createJWT(JWT_SETTINGS, payload, JWT_KEY);

  context.response.body = { token, payload };
});


// just verify token in header
router.get('/verify', async (context) => {
  // get token from header
  const authorization = context.request.headers.get('Authorization');
  const token: string = authorization?.split(' ')[1] || '';

  // verify JWT token
  try {
    const payload = await verifyJWT(token, JWT_KEY);
    // sub == "business"
    if (payload?.sub === 'business') {
      context.response.status = 200;
    }
  } catch (error) {
    // bad request
    context.response.status = 400;
    context.response.body = { error: `Invalid token`, msg: error.message };
  }
});

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

// // cors
// app.use(async (context, next) => {
//   await next();
//   context.response.headers.set("Access-Control-Allow-Origin", "*");
//   context.response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//   context.response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
// });

app.addEventListener("listen", ({ port }) => {
  console.log(`Listening at http://localhost:${port}`);
});

if (import.meta.main) {
  await app.listen({ port: RAVEN_API_PORT });
}

export { app };
