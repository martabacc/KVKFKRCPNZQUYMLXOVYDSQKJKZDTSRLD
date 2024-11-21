import NodeCache from "node-cache"
import AppConstant from "../constants/AppConstant.mjs";

export default class CsrfCacheRepository {
	constructor() {
		this.cache = new NodeCache();
	}

	set = (key, value) => {
		this.cache.set(key, value, AppConstant.CSRF_CACHE_EXPIRY_IN_SEC);
	};

	get = (key) => {
		return this.cache.get(key);
	};

	delete = (key) => {
		return this.cache.del(key);
	};

	getAll = () => {
		return this.cache.getStats();
	};
}
