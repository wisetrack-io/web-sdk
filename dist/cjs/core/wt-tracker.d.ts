import { WTEvent } from "../types/event/wt-event";
/** @internal */
declare class WTTracker {
    private isRunning;
    private initialized;
    private get isEnabled();
    initialize(): Promise<void>;
    startTracking(): Promise<void>;
    stopTracking(): Promise<void>;
    checkPushToken(token: string): Promise<void>;
    trackEvent(event: WTEvent.Default | WTEvent.Revenue): Promise<void>;
    private getCountryCode;
    private createAttribution;
    private checkFirstSession;
    private checkSdkClicks;
    private createRequest;
    private createDeviceID;
    private setActivityTimes;
    private checkSessionIntervals;
    private isVisibleFocused;
    private addObservers;
}
/** @internal */
export declare const tracker: WTTracker;
export {};
