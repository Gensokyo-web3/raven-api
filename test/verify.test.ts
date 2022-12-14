import { superoak, ethers } from '../deps.ts';
import { app } from '../main.ts';



Deno.test('GET / show hello msg: {"msg":"RAVEN API"}', async () => {
  const request = await superoak(app);
  await request.get("/").expect(200);
  // await request.get("/").expect(200);
});

// get nonce by random ethers address
Deno.test('get nonce by address, sign by wallet signer and verify', async () => {


  const wallet = ethers.Wallet.createRandom();

  const address = await wallet.getAddress();

  const request1 = await superoak(app);
  const response1 = await request1.get(`/${address}/nonce`).expect(200);
  const { nonce, payload } = response1.body;

  const signature = await wallet.signMessage(nonce);

  console.log(signature);

  const request2 = await superoak(app);
  const verifyResponse = await request2.post(`/${address}/verify`)
    .set('Content-Type', 'application/json')
    .send({ signature, nonce })
    .expect(200);

  // verify token by get /verify
  const request3 = await superoak(app);
  await request3.get(`/verify`)
    // .set('Content-Type', 'application/json')
    .set('Authorization', `Bearer ${verifyResponse.body.token}`)
    .expect(200);


});
