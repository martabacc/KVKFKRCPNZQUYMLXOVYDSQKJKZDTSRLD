import CryptoTool from "../tools/CryptoTool.mjs";

export default class CsrfCacheService {
	constructor({ repository }) {
		this.repository = repository
	}

	create = ({ userId, token, amount }) => {
		const t = CryptoTool.generateCSRFToken()

		this.repository.set(t, { amt: amount, u: userId })
		return t;
	}

	get = ({ token }) => {
		this.repository.get(token)
	}
}


