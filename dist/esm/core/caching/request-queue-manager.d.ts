import { RequestRecord } from "./queue-data";
/** @internal */
export declare class RequestsQueueManager {
    private isInitialized;
    private isProcessing;
    private isCurrentlyProcessing;
    private mutex;
    private processingInterval;
    private readonly PROCESSING_INTERVAL_MS;
    private failedRequestDelay;
    private readonly MAX_DELAY_MS;
    private readonly BACKOFF_MULTIPLIER;
    private readonly BASE_DELAY_MS;
    constructor();
    initialize(): Promise<void>;
    shutdown(): Promise<void>;
    private startProcessing;
    private stopProcessing;
    addRequest(request: RequestRecord): Promise<void>;
    addPendingRequest(request: RequestRecord): Promise<void>;
    private processQueues;
    private processMainQueue;
    private calculateBackoffDelay;
    private processPendingQueue;
    private sendRequest;
    private getMainQueue;
    private saveMainQueue;
    private getPendingQueue;
    private savePendingQueue;
    private getMainRequestsSentFlag;
    private postRequestCheck;
    getQueueStatus(): {
        mainQueueLength: number;
        pendingQueueLength: number;
        isProcessing: boolean;
        mainRequestsSent: boolean;
        isInBackoffDelay: boolean;
        backoffEndsAt: number | null;
    };
    /**
     * Manually reset backoff delay (useful for testing or manual recovery)
     */
    resetBackoffDelay(): void;
    /**
     * Get current backoff delay configuration
     */
    getBackoffConfig(): {
        baseDelayMs: number;
        multiplier: number;
        maxDelayMs: number;
    };
}
/** @internal */
export declare const queueManager: RequestsQueueManager;
