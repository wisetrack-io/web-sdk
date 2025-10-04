/** @internal */
export type WTLogEngine = (level: string, prefix: string, args: any[]) => void;
/**
 * Defines the available log levels for the SDK.
 *
 * - `DEBUG`: Logs everything, including debug info.
 * - `INFO`: Logs general information.
 * - `WARN`: Logs warnings.
 * - `ERROR`: Logs errors only.
 * - `NONE`: Disables logging.
 */
export declare const WTLogLevel: {
    readonly DEBUG: "debug";
    readonly INFO: "info";
    readonly WARN: "warn";
    readonly ERROR: "error";
    readonly NONE: "none";
};
export type WTLogLevel = (typeof WTLogLevel)[keyof typeof WTLogLevel];
/** @internal */
export declare class WTLogger {
    private static level;
    private static prefix;
    private static outputEngines;
    static setLevel(level: WTLogLevel): void;
    static setPrefix(prefix: string): void;
    static addOutputEngine(engine: WTLogEngine): void;
    private static shouldLog;
    private static log;
    static debug(...args: any[]): void;
    static info(...args: any[]): void;
    static warn(...args: any[]): void;
    static error(...args: any[]): void;
}
