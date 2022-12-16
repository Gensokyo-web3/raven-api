const env = Deno.env.toObject();

const assertEnvironmentVariable = (name: string) => {
  if (env[name])
    return;

  console.error(`Missing ${name} environment variable`);
  Deno.exit(1);
}

// assertEnvironmentVariable("REDIS_PASSWORD");

export const REDIS_HOST = env.REDIS_HOST ?? "127.0.0.1";
export const REDIS_PORT = env.REDIS_PORT ?? 6379;
export const REDIS_PASSWORD = env.REDIS_PASSWORD;

export const RAVEN_POSTGRES_DB_HOST = env.RAVEN_POSTGRES_DB_HOST || '127.0.0.1';
export const RAVEN_POSTGRES_DB_PORT = Number(env.RAVEN_POSTGRES_DB_PORT || 5432);
export const RAVEN_POSTGRES_DB_USER = env.RAVEN_POSTGRES_DB_USER || 'postgres';
export const RAVEN_POSTGRES_DB_PASSWORD = env.RAVEN_POSTGRES_DB_PASSWORD || 'my-secret-pw';
export const RAVEN_POSTGRES_DB_NAME = env.RAVEN_POSTGRES_DB_NAME || 'raven';

export const RAVEN_API_JWT_SECRET = env.RAVEN_API_JWT_SECRET || "my-secret-pw-pDolHncUTL7GQvEwbJL_-f2eC-134-qn0CvwtKYhwBPMxl2G560UY3LpN5Qq5iU5_xTZRKjC98dbNT";

export const RAVEN_API_PORT = Number(env.RAVEN_API_PORT || 8081);
export const RAVEN_API_HOST = env.RAVEN_API_HOST || "127.0.0.1";
