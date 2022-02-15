import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { Recipe } from "../interfaces/types";

const NUMBEROFRESULTS = 10; // better set by client?

interface SetSearchParam {
  searchType: string
  trueFalse: boolean
}

const initialState = {
  loading: false,
  foundSet: [] as Recipe[],
  numberOfResults: NUMBEROFRESULTS,
  findBreakfast: false,
  findLunch: true,
  findDinner: true,
  GF: false,
  vegan: false,
  vegetarian: false,
  searchFor: '',
  owner: ""
}


export const search = createAsyncThunk('search/search', async ( _, thunkAPI) => {
  const dbApi = process.env.REACT_APP_API_URL
  const state = thunkAPI.getState() as RootState;
  const { numberOfResults, findBreakfast, findLunch, findDinner,
    GF, vegan, vegetarian, owner } = state.searchResults;

  try {
    const response = await fetch(`${dbApi}/recipes?searchTearm=${state.searchResults.searchFor}&numberOfResults=${numberOfResults}&findBreakfast=${findBreakfast}&findLunch=${findLunch}&findDinner=${findDinner}&GF=${GF}&vegan=${vegan}&vegetarian=${vegetarian}&owner=${owner}`);

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
    },
    setOwner: (state, action: PayloadAction<string>) => {
      state.owner = action.payload;
    },
    setSearchTearm: (state, action: PayloadAction<string>) => {
      state.searchFor = action.payload;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(search.fulfilled, (state, action) => {
        state.loading = false;

        state.foundSet = action.payload;
      })
      .addCase(search.pending, state => {
        state.loading = true;
      })
  }
});


export const { setResultSetSize, setFindMealSettings, setOwner, setSearchTearm } = searchResults.actions;

export const selectLoading = (state: RootState) => state.searchResults.loading;
export const selectSearchResults = (state: RootState) => state.searchResults.foundSet;
export const selectOwner = (state: RootState) => state.searchResults.owner;
export const selectFindBreakfast = (state: RootState) => state.searchResults.findBreakfast;
export const selectFindDinner = (state: RootState) => state.searchResults.findDinner;
export const selectFindLunch = (state: RootState) => state.searchResults.findLunch;
export const selectFindGF = (state: RootState) => state.searchResults.GF;
export const selectFindVegan = (state: RootState) => state.searchResults.vegan;
export const selectFindVegetarian = (state: RootState) => state.searchResults.vegetarian;

export default searchResults.reducer;