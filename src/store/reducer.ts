import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from './store';
import { ISwapModel, TSearchOptions } from './types';

interface AppState {
  search: {
    value: string;
    option: TSearchOptions;
  };
  items: ISwapModel[];
  isLoading: boolean;
}

const initialState: AppState = {
  search: {
    value: '',
    option: 'all',
  },
  items: [],
  isLoading: true,
};

export const fetchBlocksData = createAsyncThunk(
  'app',
  async () => fetch('https://gist.githubusercontent.com/sirWill/9f3e7cca5ca3f3a2f4b6378b725ffb5d/raw/c3cc18c73f1d0d5b9b8b83259f47d9bb68edea5e').then(
    (response) => response.json(),
  ),
);

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search.value = action.payload;
    },
    setSearchOption: (state, action: PayloadAction<TSearchOptions>) => {
      state.search.option = action.payload;
    },
    setItems: (state, action: PayloadAction<{ data: ISwapModel[] }>) => {
      state.items = action.payload.data;
    },
    setSelected: (state, action: PayloadAction<{ id: string, selected: boolean }>) => {
      const index = state.items.findIndex((item) => item.id === action.payload.id);
      state.items[index].selected = action.payload.selected;
    },
  },
  extraReducers: {
    [fetchBlocksData.pending as unknown as string]: (state: any) => {
      state.isLoading = true;
    },
    [fetchBlocksData.fulfilled as unknown as string]: (
      state: any,
      action: PayloadAction<ISwapModel[] >,
    ) => {
      state.items = action.payload;
      state.isLoading = false;
    },
  },
});

export const {
  setSearch, setItems, setSelected, setSearchOption,
} = appSlice.actions;

export const selectSearch = (state: RootState) => state.appReducer.search;
export const selectItems = (state: RootState) => state.appReducer.items;
export const selectLoading = (state: RootState) => state.appReducer.isLoading;

export default appSlice.reducer;
