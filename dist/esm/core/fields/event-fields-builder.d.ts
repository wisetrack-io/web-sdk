import { WTEvent } from "../../types/event/wt-event";
import { FieldsBuilder } from "./fields-builder";
/** @internal */
export declare class EventFieldsBuilder extends FieldsBuilder {
    event: WTEvent;
    constructor(event: WTEvent);
    build(): Promise<Record<string, any>>;
}
