import NodeCache from "node-cache"
import AppConstant from "../constants/AppConstant.mjs";
import ErrorConstant from "../constants/ErrorConstant.mjs";

export default class InMemoryCacheRepository {
	constructor() {
		this.cache = new NodeCache();
	}

	set = (key, value) => {
		if (this.cache.getStats().ksize >= AppConstant.LIMIT_STORED_CSRF) {
			return { error: ErrorConstant.CSRF_CACHE_LIMIT_REACHED }
		}

		this.cache.set(key, value, AppConstant.CSRF_CACHE_EXPIRY_IN_SEC);
		return {}
	};

	get = (key) => {
		return this.cache.get(key);
	};

	delete = (key) => {
		return this.cache.del(key);
	};

	deleteAll = () => {
		return this.cache.flushAll();
	};

	stat = () => {
		return this.cache.getStats();
	};

	getAll = () => {
		return this.cache.keys().map((key) => {
			const value = this.cache.get(key);
			const ttl = this.cache.getTtl(key);
			const ttlHuman = ttl ? Math.round((ttl - Date.now()) / 1000) + ' seconds' : 'No TTL';

			return {
				key, value, ttl: ttlHuman,
			};
		});
	}
}
