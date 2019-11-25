const getUserCart = require('./methods/getUserCart');

const defaultConfig = {};

class CartAdapter {
	constructor(config = defaultConfig) {
		this.config = { ...config };
		this.getUserCart = getUserCart;
	}
}

module.exports = CartAdapter;
