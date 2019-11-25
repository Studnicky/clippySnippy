const applyPromosToUserCart = require('./methods/applyPromosToUserCart');

const defaultConfig = {};

class PromoController {
	constructor(config = defaultConfig) {
		this.config = { ...config };
		this.applyPromosToUserCart = applyPromosToUserCart;
	}
}

module.exports = PromoController;
