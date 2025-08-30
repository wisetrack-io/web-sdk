/** @internal */
export declare class WTConfig {
    events: string;
    sessions: string;
    sdkClicks: string;
    sdkInfos: string;
    attributions: string;
    sdkEnabled: boolean;
    sdkUpdate: boolean;
    sessionInterval: string;
    subsessionInterval: string;
    constructor(events: string, sessions: string, sdkClicks: string, sdkInfos: string, attributions: string, sdkEnabled?: boolean, sdkUpdate?: boolean, sessionInterval?: string, subsessionInterval?: string);
    static fromJson(json: any): WTConfig;
    static get defaultValue(): WTConfig;
}
