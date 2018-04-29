"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DI {
    constructor() {
        this._factories = {};
    }
    keys() {
        return Object.keys(this._factories);
    }
    has(key) {
        return key in this._factories;
    }
    set(key, factory) {
        this._factories[key] = factory;
        return this;
    }
    get(key) {
        const factory = this._factories[key];
        return factory(this);
    }
    create(key, ...args) {
        const Class = this.get(key);
        return new Class(...args);
    }
    decorate(key, decorateFactory) {
        this.set(key, decorateFactory(this.get(key)));
        return this;
    }
}
exports.default = DI;
//# sourceMappingURL=index.js.map