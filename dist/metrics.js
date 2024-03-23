"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.missedCounter = exports.hitCounter = void 0;
const prom_client_1 = __importDefault(require("prom-client"));
exports.hitCounter = new prom_client_1.default.Counter({
    name: 'cache_hit',
    help: 'Cache Hit',
});
exports.missedCounter = new prom_client_1.default.Counter({
    name: 'cache_missed',
    help: 'Cache Missed',
});
