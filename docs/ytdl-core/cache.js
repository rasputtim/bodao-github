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
const { setTimeout } = require('timers');
// A cache that expires.
module.exports = class Cache extends Map {
    constructor(timeout = 1000) {
        super();
        this.timeout = timeout;
    }
    set(key, value) {
        if (this.has(key)) {
            clearTimeout(super.get(key).tid);
        }
        super.set(key, {
            tid: setTimeout(this.delete.bind(this, key), this.timeout).unref(),
            value,
        });
    }
    get(key) {
        let entry = super.get(key);
        if (entry) {
            return entry.value;
        }
        return null;
    }
    getOrSet(key, fn) {
        if (this.has(key)) {
            return this.get(key);
        }
        else {
            let value = fn();
            this.set(key, value);
            (() => __awaiter(this, void 0, void 0, function* () {
                try {
                    yield value;
                }
                catch (err) {
                    this.delete(key);
                }
            }))();
            return value;
        }
    }
    delete(key) {
        let entry = super.get(key);
        if (entry) {
            clearTimeout(entry.tid);
            super.delete(key);
        }
    }
    clear() {
        for (let entry of this.values()) {
            clearTimeout(entry.tid);
        }
        super.clear();
    }
};
//# sourceMappingURL=cache.js.map