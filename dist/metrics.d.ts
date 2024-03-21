import client from 'prom-client';
export declare const hitHistogram: client.Histogram<"key">;
export declare const cachedHistogram: client.Histogram<"key">;
export declare const missedHistogram: client.Histogram<"key">;
