/** @internal */
export declare class WTConfig {
    baseUrl: string;
    events?: string;
    sessions?: string;
    sdkClicks?: string;
    sdkInfos?: string;
    attributions?: string;
    appSettings?: string;
    sdkEnabled: boolean;
    forceUpdate: boolean;
    sdkUpdate: boolean;
    sessionInterval: string;
    subsessionInterval: string;
    constructor(baseUrl: string, events?: string, sessions?: string, sdkClicks?: string, sdkInfos?: string, attributions?: string, appSettings?: string, sdkEnabled?: boolean, forceUpdate?: boolean, sdkUpdate?: boolean, sessionInterval?: string, subsessionInterval?: string);
    static fromJson(json: any): WTConfig;
    static get defaultValue(): WTConfig;
}
