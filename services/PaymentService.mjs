import CryptoTool from "../tools/CryptoTool.mjs";
import AppConstant from "../constants/AppConstant.mjs";
import ErrorConstant from "../constants/ErrorConstant.mjs";

export default class PaymentService {
	constructor(csrfTokenRepository, totpSecretRepository) {
		this.csrfTokenRepository = csrfTokenRepository
		this.totpSecretRepository = totpSecretRepository
	}

	initiate = async ({ data, otp, signature }) => {
		/* validate encryption */
		var decryptedData;
		try {
			decryptedData = CryptoTool.decryptData(data, AppConstant.SECRET_KEY_ENCRYPTION);
		} catch (e) {
			return BaseResponse.createErrorResponse(e.code)
		}
		const { userId } = decryptedData;

		/* validate totp */

		/* todo validate signature */
	};

	proceedPayment({ userId, amount }) {
		if (amount > AppConstant.TRIGGER_INSUFFICIENT_BALANCE_AMOUNT) {
			return BaseResponse.createErrorResponse(ErrorConstant.INVALID_PAYMENT_INSUFFICIENT_BALANCE);
		}
		if (amount === AppConstant.TRIGGER_PAYMENT_ALREADY_PAID) {
			return BaseResponse.createErrorResponse(ErrorConstant.INVALID_PAYMENT_INSUFFICIENT_BALANCE);
		}
		if (amount === AppConstant.TRIGGER_PAYMENT_ALREADY_PAID) {
			return BaseResponse.createErrorResponse(ErrorConstant.INVALID_PAYMENT_INSUFFICIENT_BALANCE);
		}

		const csrfToken = CryptoTool.generateCSRFToken()
		this.totpSecretRepository.set(userId, csrfToken)
		return BaseResponse.createOkResponse({
			token:
		});
	}
}


