const CartAdapter = require('../../../adapters/cartAdapter');
const PromosAdapter = require('../../../adapters/promosAdapter');
const Transformer = require('../../../modules/transformer');
const transformers = require('../transformers');

const promoTaskMapper = (promo) => { return transformers[promo.id] };

module.exports = async function applyPromosToUserCart(userId) {
	const cart = await new CartAdapter().getUserCart(userId);
	const activePromos = await new PromosAdapter().getPromos({ active: true });
	/*
	*	So the whole thing here is that we don't necessarily know which promos are active
 *	We shouldn't have to care or make code changes /redeploy just for promos to be toggled on/off
 *	This approach would let us inject promos programmatically from a CMS
 */
	const promoEngine = new Transformer({});
	/*
	* This dispatcher could use some functional currying to generate a more generic promo map
	*	Picture a config that specifies a map of promo ID to config items
	* We might apply a promo title, targetItem, and triggerItem to generic methods
 *	That would allow business side to configure deals through a simple interface
 *	The less code changes required for new business requirements, the better the product
 *	I didn't build that because I started on this at 9pm on a Sunday after a busy weekend but it's not a lot more work
	*/
	const promoTransformers = activePromos.map(promoTaskMapper);
	promoEngine.addTasks(promoTransformers);
	/*
	*	The Koa/Express middleware engines don't like stacked args like this, mine is fine with it
	*	They don't _technically_ need to be separate args, but I prefer immutable for larger systems
	* Accumulator patterns are useful and all, but immutable is a great risk mitigation tactic for large teams
	*/
	const cartWithPromos = await promoEngine.execute(cart, []);
	return cartWithPromos;
}
