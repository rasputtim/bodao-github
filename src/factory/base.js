/**
 * Represents a WhatsApp data structure
 */
export default class Base_ {
    constructor() {
    }
    set client(c) {
        this._client = c;
    }
    get client() { return this._client; }
    _clone() {
        return Object.assign(Object.create(this), this);
    }
    _patch(data) { return data; }
}
//# sourceMappingURL=base.js.map