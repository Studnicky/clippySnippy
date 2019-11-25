const getInventoryCount = require('./methods/getInventoryCount');

const defaultConfig = {};

class InventoryAdapter {
	constructor(config = defaultConfig) {
		this.config = { ...config };
		this.getInventoryCount = getInventoryCount;
	}
}

module.exports = InventoryAdapter;
