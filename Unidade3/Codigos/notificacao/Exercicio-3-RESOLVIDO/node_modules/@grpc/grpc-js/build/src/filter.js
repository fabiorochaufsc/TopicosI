"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class BaseFilter {
    sendMetadata(metadata) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield metadata;
        });
    }
    receiveMetadata(metadata) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield metadata;
        });
    }
    sendMessage(message) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield message;
        });
    }
    receiveMessage(message) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield message;
        });
    }
    receiveTrailers(status) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield status;
        });
    }
}
exports.BaseFilter = BaseFilter;
//# sourceMappingURL=filter.js.map