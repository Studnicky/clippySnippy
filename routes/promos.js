var express = require('express');
var router = express.Router();

const PromoController = require('../controllers/promos');
/* GET users listing. */

router.get('/:userId', async (req, res) => {
	/*
	* I'm really big on deconstructing to serialize as a pattern
	*	Passing unknown inputs along feels like leaving a window open for bugs
	*	This would be where I would set up an interface to enforce a data contract
	*	Typescript would be a step up but typically I just use openAPI (swagger v3) to enforce
	* Plus there's some great tools out there for visualizing and even creating routers off OpenApi Schema
	*/
	const {
		params: {
			userId
		}
	} = req;
	/*
	*	In a distributed system using REST we would assume that each resource has it's own service
	*	This task asked for the promo calculation; which might  be considered part of a larger cart service
	*	I decided to implement as though it were a separate promos service
	*	Realistically the cart source would be something like websphere
*/
	const promoController = new PromoController({});
	/*
	* You're going to see a whole lot of small files - I believe in keeping dispatchers slim and readable controllers
	* Been on enough projects where junior devs couldn't manage git well so call it a defensive approach
	*	Microservices or lambda don't *exactly* follow MVC patterns but I am definitely a zealot of the church of 12FA
	* BUT pattern concept of separation of concerns  still applies even in serverless and microservice
	* My typical patterns go something like:
	*	[Dispatcher|Router] -> Controller -> Cache ?-> [Models|Datastore|3rd-Party-API]
	* We can have a very long talk about cache invalidation patterns
	* All of these modules are inside this project, but I would normally publish them to as a private NPM module
	* Forcing an npm package helps keep things testable and creates a thought pattern of configurable modules
	* This creates mental breaks that force junior devs to reconsider taking in subcalsses/functions as args
	* IMO that is a major cause of unmaintainable spaghetti code and the #1 issue with undisciplined vanilla javascript
	*	It also forces release versioning to match any architecture update even for the most stubborn devs
	* The minor inconvenience in npm install & release versioning equates to big wins in stability and maintainability
	* This pattern has been one of the major reasons that I have never felt a need to adopt typescript
	*/
	const promoAppliedCart = await promoController.applyPromosToUserCart(userId);
	/*
	* This might look a little weird from here
	* Get into the ./modules/transformer class to see why I'm doing this
	*/
	const response = {
		cart: promoAppliedCart[1],
		appliedPromos: promoAppliedCart[2]
	};

	res.json(response);
});

module.exports = router;
