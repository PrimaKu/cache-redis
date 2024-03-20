import Cache from '../dist';

const cache = new Cache();
await cache.init();

await cache.set('one', { key: 'value' });

const data = await cache.get('one');

console.log({ data });
