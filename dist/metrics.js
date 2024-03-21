"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.missedHistogram = exports.cachedHistogram = exports.hitHistogram = void 0;
const prom_client_1 = __importDefault(require("prom-client"));
exports.hitHistogram = new prom_client_1.default.Histogram({
    name: 'cache_hit',
    help: 'Cache Hit',
    labelNames: ['key'],
});
exports.cachedHistogram = new prom_client_1.default.Histogram({
    name: 'cache_found',
    help: 'Cache found',
    labelNames: ['key'],
});
exports.missedHistogram = new prom_client_1.default.Histogram({
    name: 'cache_missed',
    help: 'Cache Missed',
    labelNames: ['key'],
});
