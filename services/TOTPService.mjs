import ErrorConstant from "../constants/ErrorConstant.mjs";

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
}


