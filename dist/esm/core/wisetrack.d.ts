import { WTInitialConfig } from "../types/config/initial-config";
import { WTEvent } from "../types/event/wt-event";
import { WTLogLevel } from "../utils/logger";
/**
 * The main entry point for the WiseTrack Web SDK.
 *
 * Use this singleton to initialize the SDK, configure its behavior, and track events.
 *
 * @example
 * ```ts
 * const initialConfig: WTInitialConfig = {
 *  appToken: appToken ?? "rMN5ZCwpOzY7",
 *  appFrameWork: "native",
 *  appVersion: "1.0.0",
 * };
 * await WiseTrack.instance.init(initialConfig);
 * ```
 */
export declare class WiseTrack {
    private static _instance?;
    /**
     * Returns the singleton instance of the WiseTrack SDK.
     */
    static get instance(): WiseTrack;
    private constructor();
    private sdkInitialized;
    /**
     * Initializes the WiseTrack SDK with the given configuration.
     *
     * This method must be called before using any tracking features.
     *
     * @param initConfig - The initial configuration object.
     *
     * @example
     * ```ts
     * const initialConfig: WTInitialConfig = {
     *  appToken: appToken ?? "rMN5ZCwpOzY7",
     *  appFrameWork: "native", // your current web app framework (native, reactjs, nextjs, ...)
     *  appVersion: "1.0.0", // your current web app version
     * };
     *
     * ```
     */
    init(initConfig: WTInitialConfig): Promise<void>;
    /**
     * Sets the log level for internal SDK logging.
     *
     * @param level - The desired log level.
     *
     * @example
     * ```ts
     * WiseTrack.instance.setLogLevel(WTLogLevel.WARN)
     * // or
     * WiseTrack.instance.setLogLevel("warn")
     *
     * ```
     */
    setLogLevel(level: WTLogLevel): void;
    /**
     * Clears all stored data and stops the tracker.
     */
    flush(): void;
    /**
     * Returns whether the SDK is currently enabled.
     */
    isEnabled(): boolean;
    /**
     * Enables or disables the SDK.
     *
     * Throws an error if the SDK is disabled by the server or needs an update.
     *
     * @param enabled - Whether to enable the SDK.
     * @throws If the server has disabled the SDK or a forced update is required.
     */
    setEnabled(enabled: boolean): void;
    /**
     * Starts the tracking process.
     *
     * @remarks
     * The SDK must be initialized and enabled before calling this method.
     *
     * NOTE: call this method just if you set startTrackerAutomatically=false in WTInitialConfig
     */
    startTracking(): Promise<void>;
    /**
     * Stops the tracking process.
     */
    stopTracking(): Promise<void>;
    /**
     * Sets the Firebase Cloud Messaging (FCM) push token for server.
     *
     * @param token - The FCM token.
     */
    setFCMToken(token: string): Promise<void>;
    /**
     * Tracks a custom event or revenue event.
     *
     * @param event - The event object to be tracked.
     *
     * @example
     * ```ts
     * // Create a Default Event
     * const defaultEvent = new WTEvent.Default("default-event");
     * defaultEvent.addParam("key1", "value1");
     * defaultEvent.addParam("key2", 123);
     * defaultEvent.addParam("key3", true);
     * await WiseTrack.instance.trackEvent(defaultEvent);
     *
     * // Create a Revenue Event
     * const revenueEvent = new WTEvent.Revenue("revenue-event", 100, "USD");
     * revenueEvent.addParam("item_id", "item123");
     * revenueEvent.addParam("quantity", 2);
     * await WiseTrack.instance.trackEvent(revenueEvent);
     * ```
     */
    trackEvent(event: WTEvent.Default | WTEvent.Revenue): Promise<void>;
    /** @internal */
    private getConfig;
    /** @internal */
    private updateAppSettings;
    /** @internal */
    private checkSdkEnabled;
    /** @internal */
    private checkSdkUpdate;
}
