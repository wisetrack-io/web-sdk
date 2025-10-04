import { WTLogLevel } from "../utils/logger";
import { WTSDKEnvironment } from "./environments";
/** @internal */
export declare const WTConstants: {
    readonly SDK: {
        readonly PLATFORM: "web";
        readonly VERSION: "2.0.7";
    };
    readonly CONFIG: {
        readonly DEFAULT_ENVIRONMENT: WTSDKEnvironment;
    };
    readonly DEFAULTS: {
        readonly LOG_LEVEL: WTLogLevel;
        readonly SESSION_INTERVAL: "1800";
        readonly SUBSESSION_INTERVAL: "300";
        readonly PARAMETERS_VALUE: string | undefined;
    };
};
