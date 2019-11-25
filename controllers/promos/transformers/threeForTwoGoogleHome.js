
const threeForTwoGoogleHome = async function (next, cart = [], appliedPromos = []) {

	const triggerSku = "120P90";
	const nth = 3;

	//	Get applicable items lists first
	const triggerItems = cart.reduce((triggerItems, item, index) => {
		if (item.sku === triggerSku) {
			triggerItems.push(index);
		}
		return triggerItems;
	}, []);

	triggerItems.filter((item, index) => { return index % nth === nth - 1 })
		.forEach((item, index) => {
			const target = triggerItems[index];
			cart[target].price = 0;
		});

	//	We might not want to allow certain promos to be combined so we want to track which have been
	appliedPromos.push('threeForTwoGoogleHome');
	return next();
};

module.exports = threeForTwoGoogleHome;
