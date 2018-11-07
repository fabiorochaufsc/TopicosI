/// <reference types="node" />
import { ClientDuplexStream, ClientReadableStream, ClientUnaryCall, ClientWritableStream, ServiceError } from './call';
import { CallOptions } from './call-stream';
import { ChannelOptions } from './channel';
import { ChannelCredentials } from './channel-credentials';
import { Metadata } from './metadata';
export declare const kChannel: unique symbol;
export interface UnaryCallback<ResponseType> {
    (err: ServiceError | null, value?: ResponseType): void;
}
/**
 * A generic gRPC client. Primarily useful as a base class for all generated
 * clients.
 */
export declare class Client {
    private readonly [kChannel];
    constructor(address: string, credentials: ChannelCredentials, options?: Partial<ChannelOptions>);
    close(): void;
    waitForReady(deadline: Date | number, callback: (error: Error | null) => void): void;
    private handleUnaryResponse<ResponseType>(call, deserialize, callback);
    private checkOptionalUnaryResponseArguments<ResponseType>(arg1, arg2?, arg3?);
    makeUnaryRequest<RequestType, ResponseType>(method: string, serialize: (value: RequestType) => Buffer, deserialize: (value: Buffer) => ResponseType, argument: RequestType, metadata: Metadata, options: CallOptions, callback: UnaryCallback<ResponseType>): ClientUnaryCall;
    makeUnaryRequest<RequestType, ResponseType>(method: string, serialize: (value: RequestType) => Buffer, deserialize: (value: Buffer) => ResponseType, argument: RequestType, metadata: Metadata, callback: UnaryCallback<ResponseType>): ClientUnaryCall;
    makeUnaryRequest<RequestType, ResponseType>(method: string, serialize: (value: RequestType) => Buffer, deserialize: (value: Buffer) => ResponseType, argument: RequestType, options: CallOptions, callback: UnaryCallback<ResponseType>): ClientUnaryCall;
    makeUnaryRequest<RequestType, ResponseType>(method: string, serialize: (value: RequestType) => Buffer, deserialize: (value: Buffer) => ResponseType, argument: RequestType, callback: UnaryCallback<ResponseType>): ClientUnaryCall;
    makeClientStreamRequest<RequestType, ResponseType>(method: string, serialize: (value: RequestType) => Buffer, deserialize: (value: Buffer) => ResponseType, metadata: Metadata, options: CallOptions, callback: UnaryCallback<ResponseType>): ClientWritableStream<RequestType>;
    makeClientStreamRequest<RequestType, ResponseType>(method: string, serialize: (value: RequestType) => Buffer, deserialize: (value: Buffer) => ResponseType, metadata: Metadata, callback: UnaryCallback<ResponseType>): ClientWritableStream<RequestType>;
    makeClientStreamRequest<RequestType, ResponseType>(method: string, serialize: (value: RequestType) => Buffer, deserialize: (value: Buffer) => ResponseType, options: CallOptions, callback: UnaryCallback<ResponseType>): ClientWritableStream<RequestType>;
    makeClientStreamRequest<RequestType, ResponseType>(method: string, serialize: (value: RequestType) => Buffer, deserialize: (value: Buffer) => ResponseType, callback: UnaryCallback<ResponseType>): ClientWritableStream<RequestType>;
    private checkMetadataAndOptions(arg1?, arg2?);
    makeServerStreamRequest<RequestType, ResponseType>(method: string, serialize: (value: RequestType) => Buffer, deserialize: (value: Buffer) => ResponseType, argument: RequestType, metadata: Metadata, options?: CallOptions): ClientReadableStream<ResponseType>;
    makeServerStreamRequest<RequestType, ResponseType>(method: string, serialize: (value: RequestType) => Buffer, deserialize: (value: Buffer) => ResponseType, argument: RequestType, options?: CallOptions): ClientReadableStream<ResponseType>;
    makeBidiStreamRequest<RequestType, ResponseType>(method: string, serialize: (value: RequestType) => Buffer, deserialize: (value: Buffer) => ResponseType, metadata: Metadata, options?: CallOptions): ClientDuplexStream<RequestType, ResponseType>;
    makeBidiStreamRequest<RequestType, ResponseType>(method: string, serialize: (value: RequestType) => Buffer, deserialize: (value: Buffer) => ResponseType, options?: CallOptions): ClientDuplexStream<RequestType, ResponseType>;
}
