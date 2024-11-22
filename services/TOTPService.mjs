import ErrorConstant from "../constants/ErrorConstant.mjs";
import AppConstant from "../constants/AppConstant.mjs";
import CryptoTool from "../tools/CryptoTool.mjs";
import BaseResponse from "../contracts/BaseResponse.mjs"

export default class TOTPService {
	constructor({ totpSecretRepository, authenticatorTool, totpUsageRepository }) {
		this.totpSecretRepository = totpSecretRepository
		this.authenticatorTool = authenticatorTool
		this.totpUsageRepository = totpUsageRepository
	}

	validateTOTP = ({ userId, otp }) => {
		const isUsed = !!this.totpUsageRepository.get(`${userId}-${otp}`);
		if (isUsed) {
			return ErrorConstant.INVALID_RECYCLED_TOTP
		}

		const secret = this.totpSecretRepository.get(userId);
		if (!secret) {
			return ErrorConstant.OFFLINE_PAYMENT_NOT_CONFIGURED
		}

		const isValid = this.authenticatorTool.validate({ token: otp, secret });
		if (!isValid) {
			return ErrorConstant.OFFLINE_PAYMENT_INIT_INVALID_TOTP
		}

		/* valid, set otp to used to avoid recycling */
		this.totpUsageRepository.set(`${userId}-${otp}`, 1)
	}

	generateMockTOTPForUser({ userId }) {
		const totpSecret = this.totpSecretRepository.get(userId);
		const payloadSecret = AppConstant.SECRET_KEY_ENCRYPTION

		const rawPayload = JSON.stringify({ userId });
		const encrypted = CryptoTool.encrypt(rawPayload, payloadSecret);

		const otp = this.authenticatorTool.create({ secret: totpSecret })
		return BaseResponse.createOkResponse({ data: encrypted, otp })
	}
}


