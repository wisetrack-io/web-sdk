/** @internal */
export interface DeviceInfo {
    browser: {
        name?: string;
        version?: string;
    };
    os: {
        name?: string;
        version?: string;
    };
    device: {
        type?: string;
        model?: string;
        vendor?: string;
    };
    cpu: {
        architecture?: string;
    };
    engine: {
        name?: string;
        version?: string;
    };
    ua: string;
}
type ScreenType = "touch" | "pointer";
type ScreenDensity = "high" | "low" | "medium";
type ScreenFormat = "long" | "normal" | "undefined";
type ScreenSize = "small" | "normal" | "large" | "xlarge";
declare class DeviceDetector {
    getDeviceInfo(): DeviceInfo;
    get screenDensity(): ScreenDensity;
    get screenFormat(): ScreenFormat;
    get screenSize(): ScreenSize;
    get uiMode(): number;
    get uiStyle(): string;
    get displaySize(): string;
    get screenType(): ScreenType;
}
/** @internal */
export declare const deviceDetector: DeviceDetector;
export {};
