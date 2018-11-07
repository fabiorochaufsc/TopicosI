"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const call_1 = require("./call");
const channel_1 = require("./channel");
const constants_1 = require("./constants");
const metadata_1 = require("./metadata");
// This symbol must be exported (for now).
// See: https://github.com/Microsoft/TypeScript/issues/20080
exports.kChannel = Symbol();
/**
 * A generic gRPC client. Primarily useful as a base class for all generated
 * clients.
 */
class Client {
    constructor(address, credentials, options = {}) {
        this[exports.kChannel] = new channel_1.Http2Channel(address, credentials, options);
    }
    close() {
        this[exports.kChannel].close();
    }
    waitForReady(deadline, callback) {
        const cb = lodash_1.once(callback);
        const callbackCalled = false;
        let timer = null;
        this[exports.kChannel].connect().then(() => {
            if (timer) {
                clearTimeout(timer);
            }
            cb(null);
        }, (err) => {
            // Rejection occurs if channel is shut down first.
            if (timer) {
                clearTimeout(timer);
            }
            cb(err);
        });
        if (deadline !== Infinity) {
            let timeout;
            const now = (new Date()).getTime();
            if (deadline instanceof Date) {
                timeout = deadline.getTime() - now;
            }
            else {
                timeout = deadline - now;
            }
            if (timeout < 0) {
                timeout = 0;
            }
            timer = setTimeout(() => {
                cb(new Error('Failed to connect before the deadline'));
            }, timeout);
        }
    }
    handleUnaryResponse(call, deserialize, callback) {
        let responseMessage = null;
        call.on('data', (data) => {
            if (responseMessage != null) {
                call.cancelWithStatus(constants_1.Status.INTERNAL, 'Too many responses received');
            }
            try {
                responseMessage = deserialize(data);
            }
            catch (e) {
                call.cancelWithStatus(constants_1.Status.INTERNAL, 'Failed to parse server response');
            }
        });
        call.on('end', () => {
            if (responseMessage == null) {
                call.cancelWithStatus(constants_1.Status.INTERNAL, 'Not enough responses received');
            }
        });
        call.on('status', (status) => {
            /* We assume that call emits status after it emits end, and that it
             * accounts for any cancelWithStatus calls up until it emits status.
             * Therefore, considering the above event handlers, status.code should be
             * OK if and only if we have a non-null responseMessage */
            if (status.code === constants_1.Status.OK) {
                callback(null, responseMessage);
            }
            else {
                const error = Object.assign(new Error(status.details), status);
                callback(error);
            }
        });
    }
    checkOptionalUnaryResponseArguments(arg1, arg2, arg3) {
        if (arg1 instanceof Function) {
            return { metadata: new metadata_1.Metadata(), options: {}, callback: arg1 };
        }
        else if (arg2 instanceof Function) {
            if (arg1 instanceof metadata_1.Metadata) {
                return { metadata: arg1, options: {}, callback: arg2 };
            }
            else {
                return { metadata: new metadata_1.Metadata(), options: arg1, callback: arg2 };
            }
        }
        else {
            if (!((arg1 instanceof metadata_1.Metadata) && (arg2 instanceof Object) &&
                (arg3 instanceof Function))) {
                throw new Error('Incorrect arguments passed');
            }
            return { metadata: arg1, options: arg2, callback: arg3 };
        }
    }
    makeUnaryRequest(method, serialize, deserialize, argument, metadata, options, callback) {
        ({ metadata, options, callback } =
            this.checkOptionalUnaryResponseArguments(metadata, options, callback));
        const call = this[exports.kChannel].createStream(method, metadata, options);
        const message = serialize(argument);
        const writeObj = { message };
        writeObj.flags = options.flags;
        call.write(writeObj);
        call.end();
        this.handleUnaryResponse(call, deserialize, callback);
        return new call_1.ClientUnaryCallImpl(call);
    }
    makeClientStreamRequest(method, serialize, deserialize, metadata, options, callback) {
        ({ metadata, options, callback } =
            this.checkOptionalUnaryResponseArguments(metadata, options, callback));
        const call = this[exports.kChannel].createStream(method, metadata, options);
        this.handleUnaryResponse(call, deserialize, callback);
        return new call_1.ClientWritableStreamImpl(call, serialize);
    }
    checkMetadataAndOptions(arg1, arg2) {
        let metadata;
        let options;
        if (arg1 instanceof metadata_1.Metadata) {
            metadata = arg1;
            if (arg2) {
                options = arg2;
            }
            else {
                options = {};
            }
        }
        else {
            if (arg1) {
                options = arg1;
            }
            else {
                options = {};
            }
            metadata = new metadata_1.Metadata();
        }
        return { metadata, options };
    }
    makeServerStreamRequest(method, serialize, deserialize, argument, metadata, options) {
        ({ metadata, options } = this.checkMetadataAndOptions(metadata, options));
        const call = this[exports.kChannel].createStream(method, metadata, options);
        const message = serialize(argument);
        const writeObj = { message };
        writeObj.flags = options.flags;
        call.write(writeObj);
        call.end();
        return new call_1.ClientReadableStreamImpl(call, deserialize);
    }
    makeBidiStreamRequest(method, serialize, deserialize, metadata, options) {
        ({ metadata, options } = this.checkMetadataAndOptions(metadata, options));
        const call = this[exports.kChannel].createStream(method, metadata, options);
        return new call_1.ClientDuplexStreamImpl(call, serialize, deserialize);
    }
}
exports.Client = Client;
//# sourceMappingURL=client.js.map