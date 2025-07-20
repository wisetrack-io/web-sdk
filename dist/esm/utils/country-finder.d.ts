/** @internal */
export declare class CountryFinder {
    private _country;
    getCountryCode(): Promise<string | null>;
    private tryAllEndpoints;
    private fetchWithTimeout;
}
/** @internal */
export declare const countryFinder: CountryFinder;
