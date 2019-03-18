import redis, { RedisClient, ClientOpts } from 'redis';
import { promisify } from 'util';
import dotenv from 'dotenv';
dotenv.config();

const host = process.env.REDIS_HOST || '127.0.0.1';
const port = Number(process.env.REDIS_PORT) || 6379;


const config: ClientOpts = Object.freeze({
  host,
  port,
});

export const init = (passThroughClient?: RedisClient): Promise<RedisClient> => {
  return new Promise((resolve, reject) => {
    const client = passThroughClient ? passThroughClient : redis.createClient({
      host: config.host!,
      port: config.port,
    });

    client.on('ready', () => {
      resolve(client);
    });

    client.on('error', (err) => {
      reject(err);
    });
  });
};

export const get = async(client: RedisClient, key: string) => {
  if (!(client && client.connected)) {
    throw new Error('Redis client missing or not connected');
  }
  if (!key) {
    throw new Error('Key may be null, this has been deprecated');
  }

  const getAsync = promisify(client.get.bind(client));

  const response = await getAsync(key);

  return response;
};

export const set = async(client: RedisClient, key: string, value: any, expiration?: number) => {
  if (!(client && client.connected)) {
    throw new Error('Redis client missing or not connected');
  }

  if (!key) {
    throw new Error('Key may be null, this has been deprecated');
  }

  if (!value) {
    throw new Error(`Argument 'value' is missing for 'key' ${ key }`);
  }

  if (expiration) {
    /**
     * setex equivalent to:
     * SET myKey value
     * EXPIRE myKey seconds
     */
    const setexAsync = promisify(client.setex.bind(client));

    await setexAsync(key, expiration, value);
  } else {
    /**
     * set - SET myKey value
     * */
    const setAsync = promisify(client.set.bind(client));

    await setAsync(key, value);
  }


  return key;
};

export const cleanup = (client: RedisClient) => {
  client.quit();
};