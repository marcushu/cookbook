import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userReducer from '../redux/userState';
import searchResultsReducer from '../redux/searchResultState';
import counterReducer from '../features/counter/counterSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    searchResults: searchResultsReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
