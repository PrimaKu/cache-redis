import { RedisClientOptions, createClient } from 'redis';

class Cache {
  private client = createClient();

  constructor(options: RedisClientOptions = {}) {
    this.client = createClient(options);
  }

  async init() {
    await this.client.on('error', (err) => console.error('Redis Client Error', err)).connect();
  }

  async get(key: string): Promise<any | null> {
    const value = await this.client.get(key);
    let result = null;

    try {
      result = value ? JSON.parse(value) : null;
    } catch (error) {
      console.error(error);
    }

    return result;
  }

  async set(key: string, value: any, expiry = 1440) {
    let data = '';

    try {
      data = JSON.stringify(value);
    } catch (error) {
      console.error(error);
    }

    await this.client.set(key, data, { EX: expiry });
  }

  async del(key: string) {
    await this.client.del(key);
  }
}

export default Cache;