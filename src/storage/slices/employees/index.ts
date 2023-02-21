import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getSliceLoadingState } from "storage/helpers";
import { StoreLoadingEnum } from "storage/types";
import { EmployeeDto, InitialStateDto, QueryParams } from "./types";
import employeesApi from "./api";

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
export const queryEmployees = createAsyncThunk<
  EmployeeDto[],
  QueryParams | undefined
>("employees/query", async (params) => {
  const response = await employeesApi.query(params);
  return response.data;
});

/**
 * Slices
 */

export const employeesSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {},
  extraReducers: {
    // get employees
    [`${queryEmployees.pending}`]: (state) => {
      state.loading = StoreLoadingEnum.pending;
    },
    [`${queryEmployees.fulfilled}`]: (state, action) => {
      state.loading = StoreLoadingEnum.loaded;
      state.data = action.payload;
    },
    [`${queryEmployees.rejected}`]: (state, action) => {
      state.loading = StoreLoadingEnum.loaded;
      state.error = action.payload;
    },
  },
});

/**
 * Selectors
 */
export const employeesSelector = (
  state: InitialStateDto
): EmployeeDto[] | null => state.data;

export const employeeSelector = (
  state: InitialStateDto,
  id: number
): EmployeeDto | null => state.data?.find((item) => item.id === id) || null;

export const employeesLoadingStateSelector = (state: InitialStateDto) =>
  getSliceLoadingState(state.loading);
