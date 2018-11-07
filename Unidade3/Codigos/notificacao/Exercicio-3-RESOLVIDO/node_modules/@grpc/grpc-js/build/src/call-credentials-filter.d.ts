import { CallCredentials } from './call-credentials';
import { CallStream } from './call-stream';
import { Http2Channel } from './channel';
import { BaseFilter, Filter, FilterFactory } from './filter';
import { Metadata } from './metadata';
export declare class CallCredentialsFilter extends BaseFilter implements Filter {
    private readonly credentials;
    private readonly host;
    private readonly path;
    private serviceUrl;
    constructor(credentials: CallCredentials, host: string, path: string);
    sendMetadata(metadata: Promise<Metadata>): Promise<Metadata>;
}
export declare class CallCredentialsFilterFactory implements FilterFactory<CallCredentialsFilter> {
    private readonly credentials;
    constructor(channel: Http2Channel);
    createFilter(callStream: CallStream): CallCredentialsFilter;
}
