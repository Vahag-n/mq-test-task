import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {getSliceLoadingState} from "storage/helpers";
import { StoreLoadingEnum } from 'storage/types';
import {
  UserDto,
  InitialStateDto,
} from './types';
import userApi from "./api";

/**
 * Initial State
 */
const initialState: InitialStateDto = {
  loading: StoreLoadingEnum.idle,
  error: null,
  data: null,
};

/**
 * Async Actions
 */
export const saveUserThunk = createAsyncThunk<Partial<UserDto | null>, Partial<UserDto | null>>('user/save', async (data) => {
  return await userApi.save(data);
});

export const updateUserThunk = createAsyncThunk<UserDto, UserDto>('user/save', async (data) => {
  const response = await userApi.update(data);
  return response.data;
});

export const removeUserThunk = createAsyncThunk<Partial<UserDto | null>, void>('user/remove', async () => {
  return await userApi.remove();
});

export const getUserThunk = createAsyncThunk<Partial<UserDto | null>, number | undefined>('user/get', async (id) => {
  return await userApi.get(id);
});

/**
 * Slices
 */

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
  },
  extraReducers: {
    //get user
    [`${getUserThunk.pending}`]: (state) => {
      state.loading = StoreLoadingEnum.pending;
    },
    [`${getUserThunk.fulfilled}`]: (state, action) => {
      state.loading = StoreLoadingEnum.loaded;
      state.data = action.payload;
    },
    [`${getUserThunk.rejected}`]: (state, action) => {
      state.loading = StoreLoadingEnum.loaded;
      state.error = action.payload;
    },

    [`${removeUserThunk.pending}`]: (state) => {
      state.loading = StoreLoadingEnum.pending;
    },
    [`${removeUserThunk.fulfilled}`]: (state, action) => {
      state.loading = StoreLoadingEnum.loaded;
      state.data = action.payload;
    },
    [`${removeUserThunk.rejected}`]: (state, action) => {
      state.loading = StoreLoadingEnum.loaded;
      state.error = action.payload;
    },

    [`${saveUserThunk.pending}`]: (state) => {
      state.loading = StoreLoadingEnum.pending;
    },
    [`${saveUserThunk.fulfilled}`]: (state, action) => {
      state.loading = StoreLoadingEnum.loaded;
      state.data = action.payload;
    },
    [`${saveUserThunk.rejected}`]: (state, action) => {
      state.loading = StoreLoadingEnum.loaded;
      state.error = action.payload;
    },
    [`${updateUserThunk.pending}`]: (state) => {
      state.loading = StoreLoadingEnum.pending;
    },
    [`${updateUserThunk.fulfilled}`]: (state, action) => {
      state.loading = StoreLoadingEnum.loaded;
      state.data = action.payload;
    },
    [`${updateUserThunk.rejected}`]: (state, action) => {
      state.loading = StoreLoadingEnum.loaded;
      state.error = action.payload;
    },
  },
});

/**
 * Selectors
 */
export const userSelector =
  (state: InitialStateDto): Partial<UserDto | null> => state.data;

export const userLoadingStateSelector = (state: InitialStateDto) =>
  getSliceLoadingState(state.loading);

