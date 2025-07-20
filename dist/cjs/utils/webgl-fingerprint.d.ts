/** @internal */
export declare class DeviceFingerprint {
    static isWebGLSupported(): boolean;
    static getWebGLFingerprint(): Promise<string | undefined>;
    static getCanvasFingerprint(): Promise<string | undefined>;
    private static hashData;
}
