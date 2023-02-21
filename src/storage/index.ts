import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { employeesSlice } from "storage/slices/employees";
import { userSlice } from "storage/slices/user";
import { authSlice } from "storage/slices/auth";

export const reducers = combineReducers({
  employees: employeesSlice.reducer,
  user: userSlice.reducer,
  auth: authSlice.reducer,
});

const Storage = configureStore({
  reducer: reducers,
});

export default Storage;
