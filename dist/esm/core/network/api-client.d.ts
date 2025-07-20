import { WTEndpoints } from "../../constants/endpoints";
import { WTAppSettings } from "../../types/config/wt-app-settings";
import { WTConfig } from "../../types/config/wt-config";
/** @internal */
export declare const apiClient: {
    doGetConfig(): Promise<WTConfig>;
    doGetAppSettings(): Promise<WTAppSettings>;
    doCallRequest(endpoint: WTEndpoints, params: Record<string, any>): Promise<boolean>;
};
