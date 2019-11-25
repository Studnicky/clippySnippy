
const tenPercentOffThreeOrMoreAlexa = async function (next, cart = [], appliedPromos = []) {

	const triggerSku = "A304SD";

	//	Get applicable items lists first
	const triggerItems = cart.reduce((triggerItems, item, index) => {
		if (item.sku === triggerSku) {
			triggerItems.push(index);
		}
		return triggerItems;
	}, []);

	//	Now that we have lists of trigger and target items, apply the transformation to cart
	triggerItems.forEach((item, index) => {
		const target = triggerItems[index];
		cart[target].price = cart[target].price * 0.9;
	});
	//	We might not want to allow certain promos to be combined so we want to track which have been
	appliedPromos.push('tenPercentOffThreeOrMoreAlexa');
	return next();
};

module.exports = tenPercentOffThreeOrMoreAlexa;
