import CryptoTool from "../tools/CryptoTool.mjs";
import AppConstant from "../constants/AppConstant.mjs";
import ErrorConstant from "../constants/ErrorConstant.mjs";

export default class PaymentService {
	constructor({ csrfCacheRepository, qrService, totpService }) {
		this.csrfCacheRepository = csrfCacheRepository
		this.qrService = qrService
		this.totpService = totpService
	}

	initiate = ({ data, otp, amount, signature }) => {
		var error;
		const decrypted = this.qrService.decryptAndParse({ data });
		if (decrypted.error) {
			return this._handleError(decrypted.error);
		}
		const { userId } = decrypted;

		/* validate totp */
		error = this.validatePayment({ userId, amount });
		this._handleError(error);

		error = this.totpService.validateTOTP({ userId, otp });
		this._handleError(error);

		const csrfToken = CryptoTool.generateCSRFToken()
		this.csrfCacheRepository.set(userId, csrfToken)
		return BaseResponse.createOkResponse({
			token: csrfToken
		});
	};

	validatePayment = ({ amount }) => {
		if (amount > AppConstant.TRIGGER_INSUFFICIENT_BALANCE_AMOUNT) {
			return ErrorConstant.INVALID_PAYMENT_INSUFFICIENT_BALANCE
		}
		if (amount === AppConstant.TRIGGER_PAYMENT_ALREADY_PAID) {
			return ErrorConstant.INVALID_PAYMENT_INSUFFICIENT_BALANCE
		}
		if (amount === AppConstant.TRIGGER_PAYMENT_ALREADY_PAID) {
			return ErrorConstant.INVALID_PAYMENT_INSUFFICIENT_BALANCE
		}
	}

	_handleError(errorCode) {
		if (!!errorCode) {
			return BaseResponse.createErrorResponse(errorCode)
		}
	}
}


