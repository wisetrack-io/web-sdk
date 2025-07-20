import { WTEvent } from "../../types/event/wt-event";
import { FieldsBuilder } from "./fields-builder";
/** @internal */
export declare class EventFieldsBuilder extends FieldsBuilder {
    event: WTEvent.Default | WTEvent.Revenue;
    constructor(event: WTEvent.Default | WTEvent.Revenue);
    build(): Promise<Record<string, any>>;
}
