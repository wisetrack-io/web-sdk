/** @internal */
export declare class RetryPolicy {
    private maxRetries;
    private retryInterval;
    constructor(maxRetries?: number, retryInterval?: number);
    canRetry(attempt: number): boolean;
    waitBeforeRetry(): Promise<void>;
}
