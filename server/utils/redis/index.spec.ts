import redis from 'redis-mock';
import { init, set, get } from './';

describe('Redis', () => {
  const mockClient = redis.createClient();
  const dummyClient = init(mockClient);

  describe('init', () => {
    it('should take in a client as a param', async() => {
      expect(await dummyClient).toBeInstanceOf(redis.RedisClient);
    });

    it('should return a promise', () => {
      expect(init(mockClient)).toBeInstanceOf(Promise);
    });
  });

  describe('set', () => {
    it('should return a promise', async() => {
      expect(set(await dummyClient, 'key', 'value')).toBeInstanceOf(Promise);
    });

    it('should return key if successful', async() => {
      const key = await set(await dummyClient, 'key', 'value');
      const expireKey = await set(await dummyClient, 'expKey', 'expValue');

      expect(key).toEqual('key');
      expect(expireKey).toEqual('expKey');
    });
  });

  describe('get', () => {
    it('should return a promise', async() => {
      expect(get(await dummyClient, 'key')).toBeInstanceOf(Promise);
    });

    it('should return value of key', async() => {
      /** @type string */
      const value = await get(await dummyClient, 'key');
      /** @type string */
      const expireValue = await get(await dummyClient, 'expKey');

      expect(value).toEqual('value');
      expect(expireValue).toEqual('expValue');
    });
  });
});