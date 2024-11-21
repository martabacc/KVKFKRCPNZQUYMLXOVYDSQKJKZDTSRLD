import CryptoTool from "../tools/CryptoTool.mjs";
import ErrorConstant from "../constants/ErrorConstant.mjs";

export default class CsrfCacheService {
	constructor({ repository }) {
		this.repository = repository
	}

	create = ({ amount }) => {
		const t = CryptoTool.generateCSRFToken()

		const { error } = this.repository.set(t, { amt: amount, attempt: 0 })
		if (!!error) {
			return { error: ErrorConstant.CSRF_CACHE_LIMIT_REACHED }
		}
		return { token: t };
	}

	get = ({ token }) => {
		return this.repository.get(token)
	}

	incrementPINAttempt = ({ token }) => {
		const before = this.get({ token });
		const after = { ...before, attempt: before.attempt + 1 };
		this.repository.set(token, after)

		return after
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


