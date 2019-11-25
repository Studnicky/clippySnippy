
const freeRasPiWithMacbook = async function (next, cart = [], appliedPromos = []) {

	//	This could be made more dynamic for a configurable sale item
	//	Imagine a "buy one get one" middleware that just takes a config of SKU from an ENV or dash
	const triggerSku = "43N23P";
	const targetSku = "234234";

	//	Get applicable items lists first
	const applicableItems = cart.reduce((applicableItems, item, index) => {
		if (item.sku === triggerSku) {
			applicableItems.triggerItems.push(index);
		}
		if (item.sku === targetSku) {
			applicableItems.targetItems.push(index);
		}
		return applicableItems;
	}, {
		'triggerItems': [],
		'targetItems': []
	});

	//	Now that we have lists of trigger and target items, apply the transformation to cart
	applicableItems.triggerItems.forEach((item, index) => {
		const target = applicableItems.targetItems[index];
		cart[target].price = 0;
	});
	//	We might not want to allow certain promos to be combined so we want to track which have been
	appliedPromos.push('freeRasPiWithMacbook');
	return next();
};

module.exports = freeRasPiWithMacbook;
