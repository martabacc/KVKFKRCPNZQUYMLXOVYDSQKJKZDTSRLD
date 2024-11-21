import ErrorConstant from "../constants/ErrorConstant.mjs";
import AppConstant from "../constants/AppConstant.mjs";
import CryptoTool from "../tools/CryptoTool.mjs";
import BaseResponse from "../contracts/BaseResponse.mjs"

export default class TOTPService {
	constructor({ repository, cryptoTool }) {
		this.secretRepository = repository
		this.cryptoTool = cryptoTool
	}

	validateTOTP = ({ userId, otp }) => {
		const secret = this.secretRepository.get(userId);
		if (!secret) {
			return ErrorConstant.OFFLINE_PAYMENT_NOT_CONFIGURED
		}

		const isValid = this.cryptoTool.validate({ token: otp, secret });
		if (!isValid) {
			return ErrorConstant.OFFLINE_PAYMENT_INIT_INVALID_QR
		}
	}

	generateMockTOTPForUser({ userId }) {
		const totpSecret = this.secretRepository.get(userId);
		const payloadSecret = AppConstant.SECRET_KEY_ENCRYPTION

		const rawPayload = JSON.stringify({ userId });
		const encrypted = CryptoTool.encrypt(rawPayload, payloadSecret);

		const otp = this.cryptoTool.create({ secret: totpSecret })
		return BaseResponse.createOkResponse({ data: encrypted, otp })
	}
}


