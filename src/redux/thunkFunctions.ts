import { Recipe, UserState, ShoppinglistIngredient } from "../interfaces/types";

const dbApi = process.env.REACT_APP_API_URL

const nullUser = {
  userName: "",
  orderIngredientsBy: 'recipe',
  recipes: [],
  favorites: [],
  shoppingList: []
} as UserState


/**
 * Retrieve a users information.
 * @param username find for this user
 * @returns a promise containing a userinfo object
 */
export const fetchUserInfo = async (username: string): Promise<UserState> => {
  try {
    const response = await fetch(`${dbApi}/user/${username}`);
    const user = await response.json();

    // if this user exists...
    if (Object.keys(user).length) {
      // get users recipes, these are in a separate collection
      const recipeResponse = await fetch(`${dbApi}/recipe/${username}`);
      const userRecipes = await recipeResponse.json();

      return {
        ...user,
        recipes: userRecipes
      }
    } else {
      return nullUser;
    }
  } catch (error) {
    console.log(error);
    return nullUser;
  }
}


/**
 * Creat a new user given a new user name.
 * @param userName the name of the new user
 * @returns the new users' info or info with blank username on failure
 */
export const createNewUser = async (userName: string): Promise<UserState> => {
  try {
    const response = await fetch(`${dbApi}/user`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...nullUser, userName })
      });

    const { acknowledged } = await response.json();

    const userState = acknowledged
      ? { ...nullUser, userName }
      : nullUser

    return userState;
  } catch (error) {
    console.log(error);

    return (nullUser);
  }
}


/**
 * Add a favorite recipe to the array of favorites for this user.
 * @param recipeToAdd add this to the list of favorites
 * @returns the newly added recipe
 */
export const addFavoriteRecipe = async (recipeToAdd: { recipe: Recipe, userName: string }) => {
  const { recipe, userName } = recipeToAdd;
  
  try {
    const response = await fetch(`${dbApi}/favorite`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ recipe: recipe, userName })
      });

    const { acknowledged } = await response.json();

    if (acknowledged) {
      return recipe
    }
  } catch (error) {
    console.log(error);
  }
}


/**
 * Add a new ingredient to the shopping list; independent of a recipe.
 * @param ingredient 
 * @param userName 
 * @returns the ingredient, or an empty ShoppingListIngredient on error.
 */
export const addIngredient = async ( ingredientInfo: {ingredient: ShoppinglistIngredient, userName: string}) => {
  const { userName, ingredient } = ingredientInfo;

  try {
    const response = await fetch(`${dbApi}/user/shoppinglist`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userName, ingredient })
      });

    const { acknowledged } = await response.json();

    return acknowledged ? ingredient : { recipe: '', ingredient: '' }
  } catch (error) {
    console.log(error);
    return { ingredient: '', recipe: ''}
  }
}