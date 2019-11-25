/*
* Promos would probably be stored in a CMS
* I would _imagine_ that they would have a promo ID and a status flag - say, active dates
* I just imagined stringingfying javascript middleware in a nosql database and spit out my beer
* I'm pretty sure you can actually do some _really ugly_ js-func stores in psql 9.6+
* We would probably want to just align a promo ID to a transformer function mapper so let's do that
*/

const promos = [
	{
		id: 0,
		name: "Ph'nglui mglw'nafh Cthulhu R'lyeh wgah'nagl fhtagn",
		active: false,
		description: "Upon completion of this order summon, the old one to return from his eternal slumber to enslave humanity"
	},
	{
		id: 1,
		name: "FreeRasPiWithMacbook",
		active: true,
		description: "Each sale of a MacBook Pro comes with a free Raspberry Pi B"
	},
	{
		id: 2,
		name: "ThreeForTwoGoogleHome",
		active: true,
		description: "Buy 3 Google Homes for the price of 2"
	},
	{
		id: 3,
		name: "tenPercentOffThreeOrMoreAlexa",
		active: true,
		description: "Buying more than 3 Alexa Speakers will have a 10 % discount on all Alexa speakers"
	}
];


module.exports = async function getPromos(filters = {}) {
	//	Imagine that we would pass in a set of filters to identify target promos by trigger dates/etc
	const { active } = filters;
	//	We would then build a request for the CMS or datastore off those - but hey let's stub it
	return promos.filter((promo) => {
		return promo.active === active;
	});
};
