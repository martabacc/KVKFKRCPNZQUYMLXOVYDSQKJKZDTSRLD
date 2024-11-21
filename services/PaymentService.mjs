import PaymentValidator from "../validator/PaymentValidator.mjs";

export default class PaymentService {
	constructor({ csrfCacheRepository, qrService, totpService }) {
		this.csrfCacheRepository = csrfCacheRepository
		this.qrService = qrService
		this.totpService = totpService
	}

	initiate = ({ data, otp, amount, signature }) => {
		var error;
		const decrypted = this.qrService.decryptAndParse({ data });
		!!decrypted.error && this._handleError(decrypted.error)

		const { userId } = decrypted;
		error = PaymentValidator.validate({ userId, amount });
		this._handleError(error);

		error = this.totpService.validateTOTP({ userId, otp });
		this._handleError(error);

	};

	_handleError(errorCode) {
		if (!!errorCode) {
			return BaseResponse.createErrorResponse(errorCode)
		}
	}
}


