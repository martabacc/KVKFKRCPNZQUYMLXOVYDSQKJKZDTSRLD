import CryptoTool from "../tools/CryptoTool.mjs";

export default class CsrfService {
	constructor({ repository }) {
		this.repository = repository
	}

	create = ({ userId, otp }) => {
		const csrfToken = CryptoTool.generateCSRFToken()

		this.repository.set(userId, csrfToken)
		return csrfToken;
	}
}


