import CryptoTool from "../tools/CryptoTool.mjs";
import AppConstant from "../constants/AppConstant.mjs";
import ErrorConstant from "../constants/ErrorConstant.mjs";

export default class PaymentService {
	constructor(csrfCacheRepository, totpSecretRepository, cryptoTool) {
		this.csrfCacheRepository = csrfCacheRepository
		this.totpSecretRepository = totpSecretRepository
		this.cryptoTool = cryptoTool
	}

	initiate = ({ data, otp, amount, signature }) => {
		/* validate encryption */
		var decryptedData, error;
		try {
			decryptedData = CryptoTool.decryptData(data, AppConstant.SECRET_KEY_ENCRYPTION);
		} catch (e) {
			return BaseResponse.createErrorResponse(e.code)
		}
		const { userId } = decryptedData;

		/* validate totp */

		error = this.validatePayment({ userId, amount: decryptedData.amount });
		if (!!error) {
			return BaseResponse.createErrorResponse(error)
		}

		error = this.validateTOTP({ userId, otp });
		if (!!error) {
			return BaseResponse.createErrorResponse(error)
		}

		const csrfToken = CryptoTool.generateCSRFToken()
		this.totpSecretRepository.set(userId, csrfToken)
		return BaseResponse.createOkResponse({
			token: csrfToken
		});
	};

	validateTOTP = ({ userId, otp }) => {
		const secret = this.totpSecretRepository.get(userId);
		if (!secret) {
			return ErrorConstant.OFFLINE_PAYMENT_NOT_CONFIGURED
		}

		const isValid = this.cryptoTool.validateOTP({ token: otp, secret });
		if (!isValid) {
			return ErrorConstant.OFFLINE_PAYMENT_INIT_INVALID_QR
		}
	}

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
}


