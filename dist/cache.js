"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cache = void 0;
const redis_1 = require("redis");
const metrics_1 = require("./metrics");
class Cache {
    constructor(options = {}) {
        this.client = (0, redis_1.createClient)();
        this.client = (0, redis_1.createClient)(Object.assign({ database: 9 }, options));
        this.client.on('error', (err) => console.error('Redis Client Error', err)).connect();
    }
    get(key) {
        return __awaiter(this, void 0, void 0, function* () {
            const value = yield this.client.get(key);
            let result = null;
            metrics_1.hitCounter.inc();
            if (!value) {
                metrics_1.missedCounter.inc();
            }
            try {
                result = value ? JSON.parse(value) : null;
            }
            catch (error) {
                console.error(error);
            }
            return result !== null && result !== void 0 ? result : value;
        });
    }
    set(key_1, value_1) {
        return __awaiter(this, arguments, void 0, function* (key, value, expiry = 1440) {
            let data;
            try {
                data = JSON.stringify(value);
            }
            catch (error) {
                console.error(error);
            }
            yield this.client.set(key, data !== null && data !== void 0 ? data : value, { EX: expiry });
        });
    }
    del(key) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.client.del(key);
        });
    }
}
exports.Cache = Cache;
