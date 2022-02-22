# An on-line recipe book
- Add your own recipes, create shopping lists and create weekly menus.
- Browse recipes created by other users.

### Visit the site: [eatthisorthat](https://eatthisorthat.web.app/)

---

## Storage
Data is handled by MongoDB/Atlas and structured as follows:


| **recipes** |  |
| ----------- | ----------- |
| name | *string* |
| imageUrl | *string* |
| instructions | *sting* |
| ingredients | *[string]* |
| description | *string* |
| breakfast | *bool* |
| lunch | *bool* |
| dinner | *bool* |
| glutenFree | *bool* |
| vegan | *bool* |
| vegetarian | *bool* |

| **users** | |
|-----------| -------|
| userName | *string* |
| orderIngredientsBy | *string* |
| recipes | *[string]* |
| favorites | *[string]* |
| shoppingList | *[string]* |

---



## TODOS
- [ ] allow user to delete/modify their recipes
- [ ] what about desert?
- [ ] more testing
- [ ] handle redux error states

## Possible features
- More information about each recipe: servings, prep time, etc.
- image cropping
- search by username
- ability to 'cross out' ingredients

## Notes
Security is minimal; users log in with just a unique user name - no password.  The name is obscured from other users.
The risk to a users account is a tradeoff in order to keep from overly complicating things given the less than critical nature of the data (...and I hate passwords  😡).
