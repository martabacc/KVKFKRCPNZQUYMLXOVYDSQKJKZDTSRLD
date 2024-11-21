import { authenticator } from 'otplib';
import AppConstant from "../constants/AppConstant.mjs";

export default class AuthenticatorTool {
	constructor() {
		this.authenticator = Object.create(authenticator)
		this.authenticator.options = {
			step: AppConstant.CSRF_CACHE_EXPIRY_IN_SEC, // Set the time step to 120 seconds (2 minutes)
			digits: 6,
			algorithm: 'sha1',
			window: 1, // Check the current step and one step before and after
		};
	}

	validate = ({ token, secret }) => {
		return this.authenticator.verify({ token, secret });
	}

	create = ({ secret }) => {
		return this.authenticator.generate(secret);
	}
}
