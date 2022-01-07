import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { Recipe } from "../interfaces/types";

interface SetSearchParam {
  searchType: string 
  trueFalse: boolean
}

const initialState = {
  foundSet: [] as Recipe[],
  numberOfResults: 4,
  findBreakfast: false,
  findLunch: true,
  findDinner: true,
  GF: false,
  vegan: false,
  vegetarian: false,
}


export const search = createAsyncThunk('search/search', async (_, thunkAPI) => {
  const dbApi = process.env.REACT_APP_API_URL
  const state = thunkAPI.getState() as RootState;
  const howMany = state.searchResults.numberOfResults

  try {
    const response = await fetch(`${dbApi}/recipes/${howMany}`);
    const { randomRecipes } = await response.json();

    return randomRecipes as Recipe[]
  } catch (error) {
    console.log(error);
    return []
  }
});


export const searchResults = createSlice({
  name: 'searchResults',
  initialState,
  reducers: {
    setResultSetSize: (state, action: PayloadAction<number>) => {
      state.numberOfResults = action.payload;
    },
    setFindMealSettings: (state, action: PayloadAction<SetSearchParam>) => {
      const { searchType, trueFalse } = action.payload;

      Object.assign(state, { [searchType]: trueFalse });
    }
  },
  extraReducers: builder => {
    builder
      .addCase(search.fulfilled, (state, action) => {
        state.foundSet = action.payload;
      })
  }
});

// set
export const { setResultSetSize, setFindMealSettings } = searchResults.actions;

// get
export const selectSearchResults = (state: RootState) => state.searchResults.foundSet;
export const selectFindBreakfast = (state: RootState) => state.searchResults.findBreakfast;
export const selectFindDinner = (state: RootState) => state.searchResults.findDinner;
export const selectFindLunch = (state: RootState) => state.searchResults.findLunch;
export const selectFindGF = (state: RootState) => state.searchResults.GF;
export const selectFindVegan = (state: RootState) => state.searchResults.vegan;
export const selectFindVegetarian = (state: RootState) => state.searchResults.vegetarian;

export default searchResults.reducer;