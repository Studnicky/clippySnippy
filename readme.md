## Solution
This express server stands up an endpoint at http://localhost:3000/promos/:userId

Example query:
> http://localhost:3000/promos/:userId

Expected output:
{
	cart: [],
	appliedPromos: []
}

#### INSTALLATION
Requirements are very minimal.
> npm install

#### USAGE
As this is expected to perform inside a distributed architecture, only calls that pass a valid userId are expected to return a valid result.

Make a GET request against the server with a valid userId via cURL or a browser.
> http://localhost:3000/promos/user_01

> http://localhost:3000/promos/user_02

> http://localhost:3000/promos/user_03

#### Notes
See extensive code comments for details on architecture & design decisions.
