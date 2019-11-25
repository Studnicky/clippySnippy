/*
*	Assume we have a datastore that holds the user's cart
*	This would probably be sourced from a database or 3rd party API
* Maybe it's a vendor; who cares, we're stubbing it
*/

const cartMap = {
	'user_01': [
		{
			name: 'MacBook Pro',
			price: '5399.99',
			sku: '43N23P',
		},
		{
			name: 'Raspberry Pi B',
			price: '30',
			sku: '234234',
		}
	],
	'user_02': [
		{
			name: 'Google Home',
			price: '49.99',
			sku: '120P90'
		},
		{
			name: 'Google Home',
			price: '49.99',
			sku: '120P90'
		},
		{
			name: 'Google Home',
			price: '49.99',
			sku: '120P90'
		}
	],
	'user_03': [
		{
			name: 'Alexa Speaker',
			price: '109.50',
			sku: 'A304SD'
		},
		{
			name: 'Alexa Speaker',
			price: '109.50',
			sku: 'A304SD'
		},
		{
			name: 'Alexa Speaker',
			price: '109.50',
			sku: 'A304SD'
		}
	]
};

module.exports = async function getUserCart(userId) {
	return cartMap[userId];
};
