import { RedisClientOptions } from 'redis';
import { KEYS } from './constant';
declare class Cache {
    private client;
    constructor(options?: RedisClientOptions);
    init(): Promise<void>;
    get(key: string | KEYS): Promise<any | null>;
    set(key: string | KEYS, value: any, expiry?: number): Promise<void>;
    del(key: string | KEYS): Promise<void>;
}
export default Cache;