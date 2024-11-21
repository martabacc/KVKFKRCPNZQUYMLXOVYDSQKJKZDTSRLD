import AppConstant from "../constants/AppConstant.mjs";
import ErrorConstant from "../constants/ErrorConstant.mjs";

export default class PaymentValidator {
	static validateUniquePayment = ({ amount }) => {
		if (amount === AppConstant.TRIGGER_PAYMENT_ALREADY_PAID) {
			return ErrorConstant.INVALID_PAYMENT_ALREADY_PAID
		}
	}
	static validateAmount = ({ amount }) => {
		if (amount > AppConstant.TRIGGER_INSUFFICIENT_BALANCE_AMOUNT) {
			return ErrorConstant.INVALID_PAYMENT_INSUFFICIENT_BALANCE
		}
	}

	static validateAuthorization = ({ pin }) => {
		if (pin !== AppConstant.DEFAULT_PIN) {
			return ErrorConstant.WRONG_PIN_OFFLINE_PAYMENT
		}
	}
}


