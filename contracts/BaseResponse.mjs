export default class BaseResponse {
	static errorMap = {
		INVALID_GENERATE_ALREADY_REGISTERED: 403,
		INVALID_NOT_REGISTERED: 403,
		OFFLINE_PAYMENT_INIT_INVALID_QR: 403,
		INVALID_PAYMENT_INSUFFICIENT_BALANCE: 403,
		INVALID_PAYMENT_ALREADY_PAID: 403,
		OFFLINE_PAYMENT_NOT_CONFIGURED: 400,
		WRONG_PIN_OFFLINE_PAYMENT: 401,
		INVALID_OFFLINE_PAYMENT_TOKEN: 400,
		API_KEY_INVALID: 400,
	}

	static createOkResponse(data) {
		return {
			success: true,
			data,
			statusCode: 200
		};
	}

	static createErrorResponse(code) {
		return {
			success: false,
			code,
			statusCode: BaseResponse.getErrorStatusCode(code)
		};
	}

	static getErrorStatusCode(code) {
		return BaseResponse.errorMap[code] || 500;
	}
}
