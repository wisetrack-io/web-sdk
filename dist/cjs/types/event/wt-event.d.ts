import { RevenueCurrency } from "./revenue-currency";
type WTEventType = "default" | "revenue";
type EventParam = string | number | boolean;
export declare namespace WTEvent {
    /**
     * Represents a generic custom event.
     *
     * Use this class to log custom actions performed by the user.
     *
     * @example
     * ```ts
     * const event = new WTEvent.Default("signup");
     * event.addParam("method", "Google");
     * WiseTrack.instance.trackEvent(event);
     * ```
     */
    class Default {
        /**
         * The type of event.
         * @internal
         */
        readonly type: WTEventType;
        /**
         * Optional custom key-value parameters for the event.
         */
        params?: Record<string, EventParam>;
        /**
         * The name of the event.
         */
        name: string;
        /**
         * Creates a new custom event.
         * @param name - The name of the event.
         */
        constructor(name: string);
        /**
         * Adds a parameter to the event.
         *
         * @param key - The parameter key.
         * @param value - The parameter value.
         */
        addParam(key: string, value: EventParam): void;
        /** @internal */
        toJSON(): {
            event_type: WTEventType;
            event_name: string;
            partner_params: Record<string, EventParam> | undefined;
        };
    }
    /**
     * Represents a revenue event with an amount and currency.
     *
     * Use this class to log purchases or monetary transactions.
     *
     * @example
     * ```ts
     * const purchase = new WTEvent.Revenue("order_complete", 49.99, RevenueCurrency.USD);
     * purchase.addParam("item_count", "3");
     * WiseTrack.instance.trackEvent(purchase);
     * ```
     */
    class Revenue extends Default {
        /**
         * The type of event.
         * @internal
         */
        readonly type: WTEventType;
        /**
         * The revenue amount.
         */
        amount: number;
        /**
         * The currency of the revenue.
         */
        currency: RevenueCurrency;
        /**
         * Creates a new revenue event.
         *
         * @param name - The name of the revenue event.
         * @param amount - The amount of revenue.
         * @param currency - The currency of the revenue.
         */
        constructor(name: string, amount: number, currency: RevenueCurrency);
        /** @internal */
        toJSON(): {
            event_type: WTEventType;
            event_name: string;
            revenue: number;
            currency: RevenueCurrency;
            partner_params: Record<string, EventParam> | undefined;
        };
    }
}
export {};
