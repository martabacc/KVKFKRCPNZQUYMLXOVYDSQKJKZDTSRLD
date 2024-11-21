import PaymentValidator from "../validator/PaymentValidator.mjs";
import ErrorConstant from "../constants/ErrorConstant.mjs";
import QRService from "./QRService.mjs";

export default class PaymentService {
	constructor({ csrfCacheService, totpService }) {
		this.csrfCacheService = csrfCacheService
		this.totpService = totpService
	}

	initiate = ({ data, otp, amount }) => {
		let error;
		const decrypted = QRService.decryptAndParse({ data });
		if (!!decrypted.error) {
			return this._handleError(decrypted.error)
		}

		error = PaymentValidator.validateUniquePayment({ amount });
		if (!!error) {
			return this._handleError(error)
		}

		const { userId } = decrypted;

		error = this.totpService.validateTOTP({ userId, otp });
		if (!!error) {
			return this._handleError(decrypted.error)
		}

		const csrfToken = this.csrfCacheService.create({ userId, amount });
		return BaseResponse.createOkResponse({ token: csrfToken });
	};

	authorize = ({ token, pin }) => {
		let error;

		const cachedCsrf = this.csrfCacheService.get({ token })
		if (!cachedCsrf) {
			return this._handleError(ErrorConstant.INVALID_OFFLINE_PAYMENT_TOKEN)
		}

		const { amt: amount, userId } = cachedCsrf;

		/* simulate balance check */
		error = PaymentValidator.validateAmount({ amount });
		if (!!error) {
			return this._handleError(error)
		}

		/* simulate pin check calls */
		error = PaymentValidator.validateAuthorization({ pin });
		if (!!error) {
			return this._handleError(error)
		}

		return BaseResponse.createOkResponse()
	};

	_handleError = (errorCode) => BaseResponse.createErrorResponse(errorCode)
}


