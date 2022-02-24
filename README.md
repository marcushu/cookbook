# An on-line recipe book

Add your own recipes, create shopping lists, collect favorites, browse/search recipes created by other users.


### Visit the site: [eatthisorthat](https://eatthisorthat.web.app/)

---

## TODOS

- [ ] allow user to delete/modify their recipes
- [ ] cache search results
- [ ] handle redux error states
- [ ] what about desert?

## Possible features

- More information about each recipe: servings, prep time, etc.
- image cropping
- search by username

## On the back end

Data is handled by **MongoDB/Atlas** accessed via a Node.js API.

## Note

Security is minimal; users log in with just a unique user name - no password.  The name is obscured from other users.
Any risk to a users account is a tradeoff in order to keep from overly complicating things given the less than critical nature of the data (...and I hate passwords  😡).
