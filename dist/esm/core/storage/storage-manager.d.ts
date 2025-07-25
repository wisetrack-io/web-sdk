import { WTInitialConfig } from "../../types/config/initial-config";
import { WTAppSettings } from "../../types/config/wt-app-settings";
import { WTConfig } from "../../types/config/wt-config";
import { RequestRecord } from "../caching/queue-data";
declare class StorageManager {
    clear(): void;
    private setJson;
    private getJson;
    private optionalNumber;
    private optionalBool;
    get deviceId(): string | null;
    set deviceId(value: string | null);
    get initialDate(): string | null;
    set initialDate(value: string | null);
    get initialConfig(): WTInitialConfig | null;
    set initialConfig(value: WTInitialConfig | null);
    get config(): WTConfig | null;
    set config(value: WTConfig | null);
    get appSettings(): WTAppSettings | null;
    set appSettings(value: WTAppSettings | null);
    get sdkEnabled(): boolean;
    set sdkEnabled(value: boolean);
    get sdkClickSubmit(): boolean;
    set sdkClickSubmit(value: boolean);
    get firstSessionSubmit(): boolean;
    set firstSessionSubmit(value: boolean);
    get fcmToken(): string | null;
    set fcmToken(value: string | null);
    get pushToken(): string | null;
    set pushToken(value: string | null);
    get sessionCount(): number;
    set sessionCount(value: number);
    get subSessionCount(): number;
    set subSessionCount(value: number);
    get activeDuration(): number;
    set activeDuration(value: number);
    get inactiveDuration(): number;
    set inactiveDuration(value: number);
    get inactiveTime(): number | null;
    set inactiveTime(value: number | null);
    get activeTime(): number | null;
    set activeTime(value: number | null);
    get requestRecords(): RequestRecord[];
    set requestRecords(value: RequestRecord[]);
    get pendingRequestRecords(): RequestRecord[];
    set pendingRequestRecords(value: RequestRecord[]);
    get eventCount(): number;
    set eventCount(value: number);
}
/** @internal */
export declare const storageManager: StorageManager;
export {};
