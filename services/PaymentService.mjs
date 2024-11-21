import PaymentValidator from "../validator/PaymentValidator.mjs";
import ErrorConstant from "../constants/ErrorConstant.mjs";
import QRService from "./QRService.mjs";
import BaseResponse from "../contracts/BaseResponse.mjs";

export default class PaymentService {
	constructor({ csrfCacheService, totpService, paidCsrfCacheRepository }) {
		this.csrfCacheService = csrfCacheService
		this.totpService = totpService
		this.paidCsrfCacheRepository = paidCsrfCacheRepository
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

		const { token, error: csrfError } = this.csrfCacheService.create({ userId, amount });
		if (!!csrfError) {
			return this._handleError(error)
		}
		return BaseResponse.createOkResponse({ token });
	};

	authorize = ({ token, pin }) => {
		let error;

		const hasPaid = !!this.paidCsrfCacheRepository.get(token)
		if (hasPaid) {
			return this._handleError(ErrorConstant.INVALID_PAYMENT_ALREADY_PAID)
		}

		const cachedCsrf = this.csrfCacheService.get({ token })
		if (!cachedCsrf) {
			return this._handleError(ErrorConstant.INVALID_OFFLINE_PAYMENT_TOKEN)
		}

		const { amt: amount } = cachedCsrf;

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

		this.csrfCacheService.delete({ token })
		this.paidCsrfCacheRepository.set(token, 1)
		return BaseResponse.createOkResponse({ status: "PAID", amount })
	};

	_handleError = (errorCode) => BaseResponse.createErrorResponse(errorCode)
}


