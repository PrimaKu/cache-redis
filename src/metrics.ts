import client from 'prom-client';
export const hitHistogram = new client.Histogram({
  name: 'cache_hit',
  help: 'Cache Hit',
  labelNames: ['key'],
});

export const cachedHistogram = new client.Histogram({
  name: 'cache_found',
  help: 'Cache found',
  labelNames: ['key'],
});

export const missedHistogram = new client.Histogram({
  name: 'cache_missed',
  help: 'Cache Missed',
  labelNames: ['key'],
});
