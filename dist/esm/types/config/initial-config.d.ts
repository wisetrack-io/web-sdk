import { WTUserEnvironment } from "../../constants/environments";
import { WTLogLevel } from "../../utils/logger";
/**
 * The initial configuration required to initialize the WiseTrack SDK.
 */
export interface WTInitialConfig {
    /**
     * The unique application token provided by WiseTrack Panel.
     */
    appToken: string;
    /**
     * The version of your application.
     */
    appVersion: String;
    /**
     * The framework or platform name (e.g., `native`, `react`, `next.js`).
     */
    appFrameWork: String;
    /**
     * The user environment (sandbox or production). Defaults to `PRODUCTION`.
     */
    userEnvironment?: WTUserEnvironment;
    /**
     * The waiting time in seconds before the tracker starts automatically.
     */
    trackingWaitingTime?: number;
    /**
     * If `true` (default), the tracker will start automatically after initialization.
     */
    startTrackerAutomatically?: boolean;
    /**
     * A custom device identifier.
     */
    customDeviceId?: string;
    /**
     * An optional default tracker name.
     */
    defaultTracker?: string;
    /**
     * Sets the log level for SDK logging.
     */
    logLevel?: WTLogLevel;
}
