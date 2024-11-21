import CryptoTool from "../tools/CryptoTool.mjs";
import ErrorConstant from "../constants/ErrorConstant.mjs";

export default class CsrfCacheService {
	constructor({ repository }) {
		this.repository = repository
	}

	create = ({ userId, amount }) => {
		const t = CryptoTool.generateCSRFToken()

		const { error } = this.repository.set(t, { amt: amount, u: userId })
		if (!!error) {
			return { error: ErrorConstant.CSRF_CACHE_LIMIT_REACHED }
		}
		return { token: t };
	}

	get = ({ token }) => {
		this.repository.get(token)
	}

	delete = ({ token }) => this.repository.delete(token)

	getAll = () => {
		return this.repository.getAll()
	}

	deleteAll = () => {
		this.repository.deleteAll()
		return this.repository.stat()
	}

}


