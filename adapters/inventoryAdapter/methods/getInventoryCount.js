/*
*	Assume we have a datastore that holds the inventory
*	This would probably be a high availability cache with a lock
* It might also be a vendor
* We're stubbing it though
*/

const inventoryCountyMap = {
	'43N23P': 5,
	'234234': 2,
	'120P90': 10,
	'A304SD': 10
};

module.exports = async function getQuantityBySku(itemSku) {
	/*
	*	You know, I oringially saw the inventory counts in the prompt and thought to myself:
	* "I should check that the order doesn't exceed inventory?"
	*	The thing is, that doesn't belong here. Red Herring. That would be handed by the cart service.
	*	I actually have a real awful story about a problem with an offers service doing this at Universal Studios
	*	The android app checked the availability from the offers service cache, but the webview and IOS app checked it from the orders service, which led a discrepancy between availability counts and caused a really hard to identify bug during HHN 2018 (right when virtualLine and fastPass purchase from mobile launched) - so yeah, let's not do that.
	*	Should delete this but I left it for the comments.
	*/
	return inventoryCountyMap[itemSku];
};
