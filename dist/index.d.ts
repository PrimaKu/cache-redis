import { RedisClientOptions } from "redis";
declare class Cache {
    private client;
    constructor(options?: RedisClientOptions);
    init(): Promise<void>;
    get(key: string): Promise<any | null>;
    set(key: string, value: any, expiry?: number): Promise<void>;
    del(key: string): Promise<void>;
}
export default Cache;
