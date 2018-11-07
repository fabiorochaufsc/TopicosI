/// <reference types="node" />
import { EventEmitter } from 'events';
import { CallOptions, CallStream } from './call-stream';
import { ChannelCredentials } from './channel-credentials';
import { Metadata } from './metadata';
/**
 * An interface that contains options used when initializing a Channel instance.
 */
export interface ChannelOptions {
    'grpc.ssl_target_name_override': string;
    'grpc.primary_user_agent': string;
    'grpc.secondary_user_agent': string;
    'grpc.default_authority': string;
    [key: string]: string | number;
}
export declare enum ConnectivityState {
    CONNECTING = 0,
    READY = 1,
    TRANSIENT_FAILURE = 2,
    IDLE = 3,
    SHUTDOWN = 4,
}
/**
 * An interface that represents a communication channel to a server specified
 * by a given address.
 */
export interface Channel extends EventEmitter {
    createStream(methodName: string, metadata: Metadata, options: CallOptions): CallStream;
    connect(): Promise<void>;
    getConnectivityState(): ConnectivityState;
    close(): void;
    addListener(event: string, listener: Function): this;
    emit(event: string | symbol, ...args: any[]): boolean;
    on(event: string, listener: Function): this;
    once(event: string, listener: Function): this;
    prependListener(event: string, listener: Function): this;
    prependOnceListener(event: string, listener: Function): this;
    removeListener(event: string, listener: Function): this;
}
export declare class Http2Channel extends EventEmitter implements Channel {
    readonly credentials: ChannelCredentials;
    private readonly options;
    private readonly userAgent;
    private readonly target;
    private readonly defaultAuthority;
    private connectivityState;
    private connecting;
    private subChannel;
    private filterStackFactory;
    private subChannelConnectCallback;
    private subChannelCloseCallback;
    private backoffTimerId;
    private currentBackoff;
    private currentBackoffDeadline;
    private handleStateChange(oldState, newState);
    private transitionToState(oldStates, newState);
    private startConnecting();
    constructor(address: string, credentials: ChannelCredentials, options: Partial<ChannelOptions>);
    private startHttp2Stream(authority, methodName, stream, metadata);
    createStream(methodName: string, metadata: Metadata, options: CallOptions): CallStream;
    /**
     * Attempts to connect, returning a Promise that resolves when the connection
     * is successful, or rejects if the channel is shut down.
     */
    connect(): Promise<void>;
    getConnectivityState(): ConnectivityState;
    close(): void;
}
