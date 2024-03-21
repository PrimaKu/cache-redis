import { RedisClientOptions, createClient } from 'redis';
import { KEYS } from './constant';

export class Cache {
  private client = createClient();

  constructor(options: RedisClientOptions = {}) {
    this.client = createClient(options);
    this.client.on('error', (err) => console.error('Redis Client Error', err)).connect();
  }

  async get(key: string | KEYS): Promise<any | null> {
    const value = await this.client.get(key);
    let result = null;

    try {
      result = value ? JSON.parse(value) : null;
    } catch (error) {
      console.error(error);
    }

    return result ?? value;
  }

  async set(key: string | KEYS, value: any, expiry = 1440) {
    let data;

    try {
      data = JSON.stringify(value);
    } catch (error) {
      console.error(error);
    }

    await this.client.set(key, data ?? value, { EX: expiry });
  }

  async del(key: string | KEYS) {
    await this.client.del(key);
  }
}
