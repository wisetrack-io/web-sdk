declare class ActivityTicker {
    private tickerDelay;
    private isPaused;
    private tickerJob?;
    start(): void;
    stop(): void;
    pause(): void;
    resume(): void;
}
/** @internal */
export declare const activityTicker: ActivityTicker;
export {};
