import { Cache, CacheKeys } from '../dist';
import client from 'prom-client';

const cache = new Cache();

await cache.set(CacheKeys.BANNER_LIST, { key: 'value' });

await cache.get(CacheKeys.RECOMMENDED_ARTICLE_LIST);
const data = await cache.get(CacheKeys.BANNER_LIST);

console.log({ data });

console.log(await client.register.metrics());
