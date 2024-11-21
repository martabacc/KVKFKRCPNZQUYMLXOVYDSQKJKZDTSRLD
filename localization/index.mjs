import id from './id.mjs'

export default {
	append: (code) => {
		return id[code] || id.DEFAULT
	}
}
