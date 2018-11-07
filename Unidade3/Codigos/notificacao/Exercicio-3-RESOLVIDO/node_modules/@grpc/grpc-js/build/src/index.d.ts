import { Client } from './client';
import { Status } from './constants';
import { loadPackageDefinition, makeClientConstructor } from './make-client';
import { Metadata } from './metadata';
export interface OAuth2Client {
    getRequestMetadata: (url: string, callback: (err: Error | null, headers?: {
        Authorization: string;
    }) => void) => void;
}
/**** Client Credentials ****/
export declare const credentials: {
    [key: string]: Function;
};
/**** Metadata ****/
export { Metadata };
/**** Constants ****/
export { Status as status };
/**** Client ****/
export { Client, loadPackageDefinition, makeClientConstructor, makeClientConstructor as makeGenericClientConstructor };
/**
 * Close a Client object.
 * @param client The client to close.
 */
export declare const closeClient: (client: Client) => void;
export declare const waitForClientReady: (client: Client, deadline: number | Date, callback: (error: Error | null) => void) => void;
/**** Unimplemented function stubs ****/
export declare const loadObject: (value: any, options: any) => never;
export declare const load: (filename: any, format: any, options: any) => never;
export declare const setLogger: (logger: any) => never;
export declare const setLogVerbosity: (verbosity: any) => never;
export declare const Server: (options: any) => never;
export declare const ServerCredentials: {
    createSsl: (rootCerts: any, keyCertPairs: any, checkClientCertificate: any) => never;
    createInsecure: () => never;
};
export declare const getClientChannel: (client: any) => never;
export declare const StatusBuilder: () => never;
export declare const ListenerBuilder: () => never;
export declare const InterceptorBuilder: () => never;
export declare const InterceptingCall: () => never;
