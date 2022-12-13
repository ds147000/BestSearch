import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import searchReducer from '../components/Header/searchState';

export const store = configureStore({
  reducer: {
    search: searchReducer.reducer,
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
