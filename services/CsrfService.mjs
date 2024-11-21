import CryptoTool from "../tools/CryptoTool.mjs";

export default class CsrfService {
	constructor({ repository }) {
		this.repository = repository
	}

	create = ({ userId, amt }) => {
		const t = CryptoTool.generateCSRFToken()

		this.repository.set(userId, { t, amt })
		return t;
	}
}


