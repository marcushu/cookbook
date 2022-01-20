import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { IngredientSortPolicy, Recipe, UserState } from "../interfaces/types";
import { addFavoriteRecipe, createNewUser, fetchUserInfo, addIngredient, deleteIngredient, deleteFavoriteRecipe } from "./thunkFunctions";


const initialState: UserState = {
  userName: "",
  orderIngredientsBy: 'recipe',
  recipes: [],
  favorites: [],
  shoppingList: []
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
  initialState,
  reducers: {
    setIngredientOrder: (state, action: PayloadAction<UserState["orderIngredientsBy"]>) => {
      state.orderIngredientsBy = action.payload
    },
    unsetUser: state => {
      state.userName = ''
    },
    addRecipe: (state, action: PayloadAction<Recipe>) => {
      state.recipes.push(action.payload)
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUser.fulfilled, (state, action) => {
        const { userName, orderIngredientsBy, recipes, favorites, shoppingList} = action.payload;
        
        state.userName = userName;
        state.orderIngredientsBy = orderIngredientsBy;
        state.recipes = recipes;
        state.favorites = favorites;
        state.shoppingList = shoppingList;
        // add ingredients to shopping list
        favorites.forEach(recipe => {
          const ingredientObjects = recipe.ingredients.map( item => ({ ingredient: item, recipe: recipe.name }));
          
          state.shoppingList = [...state.shoppingList, ...ingredientObjects];
        });
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.userName = action.payload.userName;
        state.orderIngredientsBy = action.payload.orderIngredientsBy as IngredientSortPolicy
        state.recipes = action.payload.recipes;
        state.favorites = action.payload.favorites;
        state.shoppingList = action.payload.shoppingList;
      })
      .addCase(addFavorite.fulfilled, (state, action) => {
        const newFavorite = action.payload!;
        const ingredientObjects = newFavorite.ingredients.map( item => ({ ingredient: item, recipe: newFavorite.name }));
        
        state.favorites.push(newFavorite)

        // add ingredients to shopping list.
        state.shoppingList = [...state.shoppingList, ...ingredientObjects];
      })
      .addCase(deleteFavorite.fulfilled, (state, action) => {
        const recipeToDelete = action.payload;

        const cleanFavoritesList = state.favorites.filter( el => !(el.name === recipeToDelete.name && el.instructions  === recipeToDelete.instructions ));
        const cleanedShoppingList = state.shoppingList.filter( ingredient => !(ingredient.recipe === recipeToDelete.name && recipeToDelete.ingredients.includes(ingredient.ingredient)))
        
        state.favorites = cleanFavoritesList;
        state.shoppingList = cleanedShoppingList;

      })
      .addCase(addToShoppingList.fulfilled, (state, action) => {
        state.shoppingList.unshift(action.payload);
      })
      .addCase(deleteFromShoppingList.fulfilled, (state, action) => {
        const { ingredient } = action.payload.ingredient
        
        const cleanedShoppingList = state.shoppingList.filter( el => !(el.ingredient === ingredient && el.recipe === ''));
        
        state.shoppingList = cleanedShoppingList;
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

export default userState.reducer;