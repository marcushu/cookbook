import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { IngredientSortPolicy, Recipe, UserState } from "../interfaces/types";
import { addFavoriteRecipe, createNewUser, fetchUserInfo, addIngredient, deleteIngredient, deleteFavoriteRecipe } from "./thunkFunctions";


const initialState: UserState = {
  userName: "",
  orderIngredientsBy: 'recipe',
  recipes: [],
  favorites: [],
  shoppingList: [],
  isLoading: false
}

const LOCALUSER = 'userInfo' // local storage key

/**
 * Load user's state from local stroage (in case of tab reload), or, absent that, 
 * load an empty user.
 * @returns user's state
 */
 const getInitialState = () => {
  if(sessionStorage.getItem(LOCALUSER)) {
    return JSON.parse(sessionStorage.getItem(LOCALUSER)!);
  } else {
    return initialState;
  }
}

// thunks
export const fetchUser = createAsyncThunk('user/fetchUser', fetchUserInfo);
export const createUser = createAsyncThunk('user/createUser', createNewUser);
export const addFavorite = createAsyncThunk('user/addFavorite', addFavoriteRecipe);
export const deleteFavorite = createAsyncThunk('user/deleteFavorite', deleteFavoriteRecipe);
export const addToShoppingList = createAsyncThunk('user/addToShoppingList', addIngredient);
export const deleteFromShoppingList = createAsyncThunk('user/deleteFromShoppingList', deleteIngredient);


export const userState = createSlice({
  name: 'user',
  initialState: getInitialState(),
  reducers: {
    setIngredientOrder: (state, action: PayloadAction<UserState["orderIngredientsBy"]>) => {
      state.orderIngredientsBy = action.payload
    },
    unsetUser: state => {
      sessionStorage.clear();

      return initialState;
    },
    addRecipe: (state, action: PayloadAction<Recipe>) => {
      state.recipes.push(action.payload);

      sessionStorage.setItem(LOCALUSER, JSON.stringify(state));
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUser.fulfilled, (state, action) => {
        let newState = {...action.payload};
        newState.shoppingList.reverse(); // newest on top
        
        newState.isLoading = false;

        // add ingredients from favorite recipes to shopping list
        action.payload.favorites.forEach(recipe => {
          const ingredientObjects = recipe.ingredients.map( item => ({ ingredient: item, recipe: recipe.name }));
          
          newState.shoppingList = [...newState.shoppingList, ...ingredientObjects];
        });

        sessionStorage.setItem(LOCALUSER, JSON.stringify(newState));

        return newState;
      })
      .addCase(fetchUser.pending, state => {
        state.isLoading = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {  //TODO: TEST this
        let newState = { ...action.payload };

        newState.isLoading = false;
        newState.orderIngredientsBy = action.payload.orderIngredientsBy as IngredientSortPolicy;

        sessionStorage.setItem(LOCALUSER, JSON.stringify(newState));

        return newState;
      })
      .addCase(createUser.pending, state => {
        state.isLoading = true;
      })
      .addCase(addFavorite.fulfilled, (state, action) => {
        const newFavorite = action.payload!;
        const ingredientObjects = newFavorite.ingredients.map( item => ({ ingredient: item, recipe: newFavorite.name }));
        
        state.isLoading = false;
        state.favorites.push(newFavorite)
        // add ingredients to shopping list.
        state.shoppingList = [...state.shoppingList, ...ingredientObjects];

        sessionStorage.setItem(LOCALUSER, JSON.stringify(state));
      })
      .addCase(addFavorite.pending, state => {
        state.isLoading = true;
      })
      .addCase(deleteFavorite.fulfilled, (state: UserState, action) => {
        const recipeToDelete = action.payload;

        const cleanFavoritesList = state.favorites.filter( el => !(el.name === recipeToDelete.name && el.instructions  === recipeToDelete.instructions ));
        const cleanedShoppingList = state.shoppingList.filter( ingredient => !(ingredient.recipe === recipeToDelete.name && recipeToDelete.ingredients.includes(ingredient.ingredient)))
        
        state.isLoading = false;
        state.favorites = cleanFavoritesList;
        state.shoppingList = cleanedShoppingList;

        sessionStorage.setItem(LOCALUSER, JSON.stringify(state));
      })
      .addCase(deleteFavorite.pending, state => {
        state.isLoading = true;
      })
      .addCase(addToShoppingList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.shoppingList.unshift(action.payload);

        sessionStorage.setItem(LOCALUSER, JSON.stringify(state));
      })
      .addCase(addToShoppingList.pending, state => {
        state.isLoading = true;
      })
      .addCase(deleteFromShoppingList.fulfilled, (state: UserState, action) => {
        state.isLoading = false
        const { ingredient } = action.payload.ingredient
        
        const cleanedShoppingList = state.shoppingList.filter( el => !(el.ingredient === ingredient && el.recipe === ''));
        
        state.shoppingList = cleanedShoppingList;

        sessionStorage.setItem(LOCALUSER, JSON.stringify(state));
      })
      .addCase(deleteFromShoppingList.pending, state => {
        state.isLoading = true;
      })
  }
});

export const { setIngredientOrder, unsetUser, addRecipe } = userState.actions;

// selectors
export const selectIngredientOrder = (state: RootState) => state.user.orderIngredientsBy
export const selectUserName = (state: RootState) => state.user.userName;
export const selectRecipes = (state: RootState) => state.user.recipes;
export const selectFavorites = (state: RootState) => state.user.favorites;
export const selectShoppingList = (state: RootState) => state.user.shoppingList;
export const selectNumOfFavorites = (state: RootState) => state.user.favorites.length;
export const selectNumOfRecipes = (state: RootState) => state.user.recipes.length;
export const selectUserLoading = (state: RootState) => state.user.isLoading;

export default userState.reducer;