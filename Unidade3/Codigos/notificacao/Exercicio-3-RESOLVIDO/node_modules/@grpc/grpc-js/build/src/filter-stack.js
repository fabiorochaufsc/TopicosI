"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
class FilterStack {
    constructor(filters) {
        this.filters = filters;
    }
    sendMetadata(metadata) {
        return lodash_1.flow(lodash_1.map(this.filters, (filter) => filter.sendMetadata.bind(filter)))(metadata);
    }
    receiveMetadata(metadata) {
        return lodash_1.flowRight(lodash_1.map(this.filters, (filter) => filter.receiveMetadata.bind(filter)))(metadata);
    }
    sendMessage(message) {
        return lodash_1.flow(lodash_1.map(this.filters, (filter) => filter.sendMessage.bind(filter)))(message);
    }
    receiveMessage(message) {
        return lodash_1.flowRight(lodash_1.map(this.filters, (filter) => filter.receiveMessage.bind(filter)))(message);
    }
    receiveTrailers(status) {
        return lodash_1.flowRight(lodash_1.map(this.filters, (filter) => filter.receiveTrailers.bind(filter)))(status);
    }
}
exports.FilterStack = FilterStack;
class FilterStackFactory {
    constructor(factories) {
        this.factories = factories;
    }
    createFilter(callStream) {
        return new FilterStack(lodash_1.map(this.factories, (factory) => factory.createFilter(callStream)));
    }
}
exports.FilterStackFactory = FilterStackFactory;
//# sourceMappingURL=filter-stack.js.map