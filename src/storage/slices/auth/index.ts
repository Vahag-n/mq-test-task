import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {getSliceLoadingState} from "storage/helpers";
import { StoreLoadingEnum } from 'storage/types';
import {
  InitialStateDto,
  AuthDto,
  AuthQueryParams, AuthRegisterParams,
} from './types';
import authApi from "./api";
import Cache from "../../cache";
import {StorageConstantsEnum} from "../../cache/types";

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
export const authenticateThunk = createAsyncThunk<AuthDto | null, void>('auth/authenticate', async () => {
  return await authApi.authenticate();
});

export const loginThunk = createAsyncThunk<AuthDto, AuthQueryParams>('auth/login', async (data) => {
  const response = await authApi.login(data);
  
  if (response.data) {
    await Cache.setItem<AuthDto>(StorageConstantsEnum.User, response.data);
  }

  return response.data;
});

export const registerThunk = createAsyncThunk<AuthDto, AuthRegisterParams>('auth/register', async (data) => {
  const response = await authApi.register(data);
  return response.data;
});

/**
 * Slices
 */

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
  },
  extraReducers: {
    //get auth
    [`${authenticateThunk.pending}`]: (state) => {
      state.loading = StoreLoadingEnum.pending;
    },
    [`${authenticateThunk.fulfilled}`]: (state, action) => {
      state.loading = StoreLoadingEnum.loaded;
      state.data = action.payload;
    },
    [`${authenticateThunk.rejected}`]: (state, action) => {
      state.loading = StoreLoadingEnum.loaded;
      state.error = action.payload;
    },

    [`${loginThunk.pending}`]: (state) => {
      state.loading = StoreLoadingEnum.pending;
    },
    [`${loginThunk.fulfilled}`]: (state, action) => {
      state.loading = StoreLoadingEnum.loaded;
      state.data = action.payload;
    },
    [`${loginThunk.rejected}`]: (state, action) => {
      state.loading = StoreLoadingEnum.loaded;
      state.error = action.payload;
    },

    [`${registerThunk.pending}`]: (state) => {
      state.loading = StoreLoadingEnum.pending;
    },
    [`${registerThunk.fulfilled}`]: (state, action) => {
      state.loading = StoreLoadingEnum.loaded;
      state.data = action.payload;
    },
    [`${registerThunk.rejected}`]: (state, action) => {
      state.loading = StoreLoadingEnum.loaded;
      state.error = action.payload;
    },
  },
});

/**
 * Selectors
 */
export const authSelector =
  (state: InitialStateDto): AuthDto | null => state.data;

export const authLoadingStateSelector = (state: InitialStateDto) =>
  getSliceLoadingState(state.loading);

