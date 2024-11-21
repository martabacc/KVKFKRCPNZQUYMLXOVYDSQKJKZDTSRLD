class BaseResponse {
    static createOkResponse(data) {
        return {
            success: true,
            data
        };
    }

    static createErrorResponse(code, message) {
        return {
            success: false,
            code,
            message
        };
    }
}
