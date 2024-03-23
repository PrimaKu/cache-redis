import client from 'prom-client';
export const hitCounter = new client.Counter({
  name: 'cache_hit',
  help: 'Cache Hit',
});

export const missedCounter = new client.Counter({
  name: 'cache_missed',
  help: 'Cache Missed',
});
