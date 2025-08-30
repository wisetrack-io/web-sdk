import { EventParam } from "./wt-event";
/** @internal */
export declare class WTEventValidationError extends Error {
    constructor(message: string);
}
/** @internal */
export declare class WTEventValidator {
    private static readonly MAX_LENGTH;
    private static readonly FORBIDDEN_KEY;
    /** Patterns for SQL Injection */
    private static readonly SQL_INJECTION_PATTERNS;
    /** Patterns for Script Injection (XSS) */
    private static readonly SCRIPT_INJECTION_PATTERNS;
    /** Dangerous characters */
    private static readonly DANGEROUS_CHARS;
    /** Check for SQL Injection patterns */
    private static containsSQLInjection;
    /** Check for Script Injection patterns */
    private static containsScriptInjection;
    /** Check for dangerous characters */
    private static containsDangerousChars;
    /** Check for malicious content */
    private static isMaliciousContent;
    /**
     * Validate key parameter
     */
    static validateKey(key: string): void;
    /**
     * Validate value parameter
     */
    static validateValue(value: EventParam): void;
}
