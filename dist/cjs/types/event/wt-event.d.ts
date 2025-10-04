import { RevenueCurrency } from "./revenue-currency";
type WTEventType = "default" | "revenue";
export type EventParam = string | number | boolean;
/**
 * Represents an event that can be tracked.
 *
 * Use the static factory methods to create events:
 * - `WTEvent.defaultEvent()` for default events
 * - `WTEvent.revenueEvent()` for revenue/purchase events
 *
 * @example
 * ```ts
 * // Simple event
 * const event1 = WTEvent.defaultEvent("signup");
 *
 * // Event with parameters
 * const event2 = WTEvent.defaultEvent("signup", { method: "Google", platform: "web" });
 *
 * // Revenue event
 * const purchase = WTEvent.revenueEvent("order_complete", 49.99, RevenueCurrency.USD, {
 *   item_count: 3,
 *   payment_method: "credit_card"
 * });
 *
 * WiseTrack.instance.trackEvent(event1);
 * ```
 */
export declare class WTEvent {
    /**
     * The type of event.
     * @internal
     */
    readonly type: WTEventType;
    /**
     * The name of the event.
     */
    readonly name: string;
    /**
     * Custom key-value parameters for the event.
     */
    readonly params: Record<string, EventParam>;
    /**
     * The revenue amount (only for revenue events).
     */
    readonly amount?: number;
    /**
     * The currency of the revenue (only for revenue events).
     */
    readonly currency?: RevenueCurrency;
    /**
     * Private constructor. Use static factory methods instead.
     * @internal
     */
    private constructor();
    /**
     * Creates a default event for tracking default user actions.
     *
     * @param name - The name of the event.
     * @param params - Optional custom key-value parameters for the event.
     * @returns A new WTEvent instance.
     *
     * @example
     * ```ts
     * const event = WTEvent.defaultEvent("button_click", { button_id: "signup" });
     * WiseTrack.instance.trackEvent(event);
     * ```
     */
    static defaultEvent(name: string, params?: Record<string, EventParam>): WTEvent;
    /**
     * Creates a revenue event for tracking purchases or monetary transactions.
     *
     * @param name - The name of the revenue event.
     * @param amount - The amount of revenue.
     * @param currency - The currency of the revenue.
     * @param params - Optional custom key-value parameters for the event.
     * @returns A new WTEvent instance.
     *
     * @example
     * ```ts
     * const purchase = WTEvent.revenueEvent("purchase", 99.99, RevenueCurrency.USD, {
     *   item_count: 3
     * });
     * WiseTrack.instance.trackEvent(purchase);
     * ```
     */
    static revenueEvent(name: string, amount: number, currency: RevenueCurrency, params?: Record<string, EventParam>): WTEvent;
    /**
     * Validates and sets multiple parameters.
     * @internal
     */
    private validateAndSetParams;
}
export {};
