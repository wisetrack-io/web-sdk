import { WTEndpoints } from "../../constants/endpoints";
import { FieldsBuilder } from "../fields/fields-builder";
/** @internal */
export interface RequestRecordCreator {
    endpoint: WTEndpoints;
    fBuilder?: FieldsBuilder;
    queueType?: "main" | "pending";
}
/** @internal */
export declare class RequestRecord {
    readonly id: string;
    readonly endpoint: WTEndpoints;
    readonly parameters: Record<string, any>;
    readonly createdAt: number;
    retryCount: number;
    maxRetries: number;
    constructor(endpoint: WTEndpoints, parameters: Record<string, any>);
}
/** @internal */
export declare class Mutex {
    private locked;
    private waitingQueue;
    acquire(): Promise<void>;
    release(): void;
}
