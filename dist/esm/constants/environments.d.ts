/**
 * Defines the user environment in which the SDK is running.
 *
 * - `SANDBOX`: Use this for testing and development.
 * - `PRODUCTION`: Use this for production deployment.
 */
export declare const WTUserEnvironment: {
    readonly SANDBOX: "sandbox";
    readonly PRODUCTION: "production";
};
export type WTUserEnvironment = (typeof WTUserEnvironment)[keyof typeof WTUserEnvironment];
/** @internal */
export declare const WTSDKEnvironment: {
    readonly DEBUG: "debug";
    readonly STAGE: "stage";
    readonly PRODUCTION: "production";
};
/** @internal */
export type WTSDKEnvironment = (typeof WTSDKEnvironment)[keyof typeof WTSDKEnvironment];
/** @internal */
export declare const EnvironmentUtils: {
    sdkEnvironment: WTSDKEnvironment;
    readonly needResponseDetails: boolean;
    readonly baseUrl: string;
};
