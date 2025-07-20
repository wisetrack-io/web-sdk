/** @internal */
export declare class FieldsBuilder {
    build(): Promise<Record<string, any>>;
    private getApplicationFields;
    private getLocalFields;
    private getDeviceFields;
}
/** @internal */
export declare const fieldsBuilder: FieldsBuilder;
