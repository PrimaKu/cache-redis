import { RedisClientOptions } from 'redis';
import { CacheKeys } from './constant';
export declare class Cache {
    private client;
    constructor(options?: RedisClientOptions);
    get(key: string | CacheKeys): Promise<any | null>;
    set(key: string | CacheKeys, value: any, expiry?: number): Promise<void>;
    del(key: string | CacheKeys): Promise<void>;
}
