import { RedisClientOptions, createClient } from 'redis';
import { CacheKeys } from './constant';
import { hitCounter, missedCounter } from './metrics';

export class Cache {
  private client = createClient();

  constructor(options: RedisClientOptions = {}) {
    this.client = createClient({
      database: 9,
      ...options,
    });
    this.client.on('error', (err) => console.error('Redis Client Error', err)).connect();
  }

  async get(key: string | CacheKeys): Promise<any | null> {
    const value = await this.client.get(key);
    let result = null;

    hitCounter.inc();

    if (!value) {
      missedCounter.inc();
    }

    try {
      result = value ? JSON.parse(value) : null;
    } catch (error) {
      console.error(error);
    }

    return result ?? value;
  }

  async set(key: string | CacheKeys, value: any, expiry = 1440) {
    let data;

    try {
      data = JSON.stringify(value);
    } catch (error) {
      console.error(error);
    }

    await this.client.set(key, data ?? value, { EX: expiry });
  }

  async del(key: string | CacheKeys) {
    await this.client.del(key);
  }
}
