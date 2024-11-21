import ErrorConstant from "../constants/ErrorConstant.mjs";
import AppConstant from "../constants/AppConstant.mjs";
import { authenticator } from "otplib";
import CryptoTool from "../tools/CryptoTool.mjs";
import BaseResponse from "../contracts/BaseResponse.mjs"

export default class TOTPService {
	constructor({ repository, cryptoTool }) {
		this.repository = repository
		this.cryptoTool = cryptoTool
	}

	validateTOTP = ({ userId, otp }) => {
		const secret = this.repository.get(userId);
		if (!secret) {
			return ErrorConstant.OFFLINE_PAYMENT_NOT_CONFIGURED
		}

		const isValid = this.cryptoTool.validateOTP({ token: otp, secret });
		if (!isValid) {
			return ErrorConstant.OFFLINE_PAYMENT_INIT_INVALID_QR
		}
	}

	generateMockTOTPForUser({ userId }) {
		const totpSecret = this.repository.get(userId);
		const payloadSecret = AppConstant.SECRET_KEY_ENCRYPTION

		const rawPayload = JSON.stringify({ userId });
		const encrypted = CryptoTool.encrypt(rawPayload, payloadSecret);

		const otp = authenticator.generate(totpSecret);
		return BaseResponse.createOkResponse({ data: encrypted, otp })
	}
}


