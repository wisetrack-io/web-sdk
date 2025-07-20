import { WTLogLevel } from "../utils/logger";
import { WTSDKEnvironment } from "./environments";
/** @internal */
export declare const WTConstants: {
    readonly SDK: {
        readonly HASH: "997bfbb583c1245a426a53dc1899ec779ff354f9";
        readonly PLATFORM: "web";
        readonly VERSION: "2.0.0";
    };
    readonly CONFIG: {
        readonly BASE_URL: "https://config.wisetrack.io";
        readonly DEFAULT_ENVIRONMENT: WTSDKEnvironment;
    };
    readonly DEFAULTS: {
        readonly LOG_LEVEL: WTLogLevel;
        readonly SESSION_INTERVAL: "1800000";
        readonly SUBSESSION_INTERVAL: "300000";
        readonly PARAMETERS_VALUE: string | undefined;
    };
};
