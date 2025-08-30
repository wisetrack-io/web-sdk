import { WTEndpoints } from "../../constants/endpoints";
import { WTConfig } from "../../types/config/wt-config";
/** @internal */
export declare const apiClient: {
    doGetConfig(): Promise<WTConfig>;
    doCallRequest(endpoint: WTEndpoints, params: Record<string, any>): Promise<boolean>;
};
