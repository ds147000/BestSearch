import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchSearch, fetchSearchResponse, Product } from "../../api/search";
import { RootState, AppThunk } from "../../app/store";

export interface CounterState {
  keyword: string;
  list: Product[];
  status: "idle" | "loading" | "failed";
}

const initialState: CounterState = {
  keyword: "",
  status: "idle",
  list: [],
};

const searchFetchIncrementAsync = createAsyncThunk(
  "search/fetchSearch",
  async (keyword: string) => {
    const response = await fetchSearch(keyword);
    return response.data;
  }
);

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    input: (state, action) => {
      if (state.keyword !== action.payload) state.keyword = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(searchFetchIncrementAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(searchFetchIncrementAsync.fulfilled, (state, action) => {
        state.status = "idle";
        console.log(action);
        state.list = action.payload.data.product_trends;
      })
      .addCase(searchFetchIncrementAsync.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const selectSearechValue = (state: RootState) => state.search.keyword;
export const selectSearechStatus = (state: RootState) => state.search.status;
export const selectSearechList = (state: RootState) => state.search.list;

export const searchFetch =
  (keyword: string) => 
  (dispatch: any, getState: any) => {
    const currentStatus = selectSearechStatus(getState());
    if (currentStatus === 'loading') return Promise.reject(new Error('Last search in progress'));

    return dispatch(searchFetchIncrementAsync(keyword));
  };

export function parseUrlKeyword(str?: string) {
  return String(str).replace(/\+/gi, ' ')
}

export default searchSlice;
