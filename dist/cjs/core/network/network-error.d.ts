/** @internal */
export declare namespace ApiError {
    class InvalidUrl extends Error {
        constructor(url: string);
    }
    class ServerError extends Error {
        statusCode: number;
        message: string;
        constructor(statusCode: number, message: string);
    }
    class NetworkError extends Error {
        constructor(message: string);
    }
    class DecodingError extends Error {
        constructor(message: string);
    }
}
