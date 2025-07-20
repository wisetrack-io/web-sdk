/**
 * Supported currencies for revenue events.
 *
 * Use one of these standard ISO currency codes when tracking revenue.
 *
 * @example
 * RevenueCurrency.USD // "USD"
 */
export declare const RevenueCurrency: {
    readonly USD: "USD";
    readonly EUR: "EUR";
    readonly JPY: "JPY";
    readonly GBP: "GBP";
    readonly AUD: "AUD";
    readonly CAD: "CAD";
    readonly CHF: "CHF";
    readonly CNY: "CNY";
    readonly SEK: "SEK";
    readonly NZD: "NZD";
    readonly MXN: "MXN";
    readonly SGD: "SGD";
    readonly HKD: "HKD";
    readonly NOK: "NOK";
    readonly KRW: "KRW";
    readonly TRY: "TRY";
    readonly RUB: "RUB";
    readonly INR: "INR";
    readonly BRL: "BRL";
    readonly ZAR: "ZAR";
    readonly IRR: "IRR";
    readonly AED: "AED";
    readonly IQD: "IQD";
    readonly SAR: "SAR";
    readonly OMR: "OMR";
    readonly BTC: "BTC";
    readonly EHT: "EHT";
    readonly LTC: "LTC";
};
export type RevenueCurrency = (typeof RevenueCurrency)[keyof typeof RevenueCurrency];
