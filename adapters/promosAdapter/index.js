const getPromos = require('./methods/getPromos');

const defaultConfig = {};

class PromosAdapter {
	constructor(config = defaultConfig) {
		this.config = { ...config };
		this.getPromos = getPromos;
	}
}

module.exports = PromosAdapter;
