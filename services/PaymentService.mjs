import PaymentValidator from "../validator/PaymentValidator.mjs";

export default class PaymentService {
	constructor({ csrfService, qrService, totpService }) {
		this.csrfService = csrfService
		this.qrService = qrService
		this.totpService = totpService
	}

	initiate = ({ data, otp, amount }) => {
		var error;
		const decrypted = this.qrService.decryptAndParse({ data });
		!!decrypted.error && this._handleError(decrypted.error)

		const { userId } = decrypted;
		error = PaymentValidator.validate({ userId, amount });
		this._handleError(error);

		error = this.totpService.validateTOTP({ userId, otp });
		this._handleError(error);

		const csrfToken = this.csrfService.create({ userId, amount });
		return BaseResponse.createOkResponse({ token: csrfToken });
	};

	authorize = ({ data, otp, amount }) => {
		var error;
		const decrypted = this.qrService.decryptAndParse({ data });
		!!decrypted.error && this._handleError(decrypted.error)

		const { userId } = decrypted;
		error = PaymentValidator.validate({ userId, amount });
		this._handleError(error);

		error = this.totpService.validateTOTP({ userId, otp });
		this._handleError(error);

		const csrfToken = this.csrfService.create({ userId, amount });
		return BaseResponse.createOkResponse({ token: csrfToken });
	};

	_handleError(errorCode) {
		if (!!errorCode) {
			return BaseResponse.createErrorResponse(errorCode)
		}
	}
}


