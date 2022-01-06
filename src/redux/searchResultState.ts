import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { Recipe } from "../interfaces/types";

const initialState = {
  foundSet: [] as Recipe[],
  numberOfResults: 4,
  findBreakfast: true,
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
    }
  },
  extraReducers: builder => {
    builder
      .addCase(search.fulfilled, (state, action) => {
        state.foundSet = action.payload;
      })
  }
});

export const { setResultSetSize } = searchResults.actions;

export const selectSearchResults = (state: RootState) => state.searchResults.foundSet;

export default searchResults.reducer;