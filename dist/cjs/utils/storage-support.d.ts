type StorageSupportResult = {
    localStorage: boolean;
    sessionStorage: boolean;
    indexedDB: boolean;
};
declare class StorageSupport {
    private supportResults;
    getSupportResult(): Promise<StorageSupportResult>;
    getStorageSizeBytes(storage: Storage): number;
    private isLocalStorageSupported;
    private isSessionStorageSupported;
    private isIndexedDBSupported;
}
/** @internal */
export declare const storageSupport: StorageSupport;
export {};
