import { reducers } from "storage";

export enum GenderEnum {
  Male = "Male",
  Female = "Female",
  Other = "Other",
}


export enum StoreLoadingEnum {
  idle = 'idle',
  pending = 'pending',
  loaded = 'loaded',
}

export interface InitialState<T, L = StoreLoadingEnum, E = Error | null> {
  loading: L;
  error: E;
  data: T;
}

export interface Error {
  code: number;
  message?: string;
}


export interface LoadingState {
  isIdle: boolean;
  isPending: boolean;
  isLoaded: boolean;
}

export type RootState = ReturnType<typeof reducers>;
