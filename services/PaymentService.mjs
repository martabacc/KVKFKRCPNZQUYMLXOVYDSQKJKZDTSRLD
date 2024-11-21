import PaymentValidator from "../validator/PaymentValidator.mjs";
import ErrorConstant from "../constants/ErrorConstant.mjs";
import QRService from "./QRService.mjs";
import BaseResponse from "../contracts/BaseResponse.mjs";
import _ from "lodash"

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

		const { token, error: csrfError } = this.csrfCacheService.create({ userId, amount });
		if (!!csrfError) {
			return this._handleError(error)
		}
		return BaseResponse.createOkResponse({ token });
	};

	authorize = ({ token, pin }) => {
		let error;

		const cachedCsrf = this.csrfCacheService.get({ token })
		if (_.isNil(cachedCsrf)) {
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
		return BaseResponse.createOkResponse()
	};

	_handleError = (errorCode) => BaseResponse.createErrorResponse(errorCode)
}


