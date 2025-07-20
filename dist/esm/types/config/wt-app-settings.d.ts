import { WTConfig } from "./wt-config";
/** @internal */
export declare class WTAppSettings {
    events: string;
    sessions: string;
    sdkClicks: string;
    sdkInfos: string;
    attributions: string;
    sessionInterval: string;
    subsessionInterval: string;
    constructor(events: string, sessions: string, sdkClicks: string, sdkInfos: string, attributions: string, sessionInterval?: string, subsessionInterval?: string);
    static fromConfig(config: WTConfig): WTAppSettings;
    static fromJson(json: any): WTAppSettings;
    static get defaultValue(): WTAppSettings;
}
