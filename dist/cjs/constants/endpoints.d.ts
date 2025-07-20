/** @internal */
export declare const WTEndpoints: {
    readonly EVENTS: "/api/v1/events";
    readonly SESSIONS: "/api/v1/sessions";
    readonly SDK_CLICKS: "/api/v1/sdk_clicks";
    readonly SDK_INFOS: "/api/v1/sdk_infos";
    readonly ATTRIBUTIONS: "/api/v1/attributions";
    readonly APP_SETTINGS: "/api/v1/app_settings";
};
/** @internal */
export type WTEndpoints = (typeof WTEndpoints)[keyof typeof WTEndpoints];
