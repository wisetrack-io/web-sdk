import { RetryPolicy } from "./retry-policy";
type HttpMethod = "GET" | "POST" | "PUT";
/** @internal */
export interface RequestOptions {
    method?: HttpMethod;
    headers?: Record<string, string>;
    params?: Record<string, any>;
    retryAttempt?: number;
}
/** @internal */
export interface ApiResponseWrapper {
    success: boolean;
    message?: string;
    result?: any;
}
/** @internal */
export declare const networkManager: {
    readonly retryPolicy: () => RetryPolicy;
    readonly sendRequest: (endpoint: string, options?: RequestOptions) => Promise<ApiResponseWrapper>;
};
export {};
