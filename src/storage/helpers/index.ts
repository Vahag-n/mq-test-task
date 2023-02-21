import {LoadingState, StoreLoadingEnum} from "storage/types";

export const getSliceLoadingState = (loadingState: StoreLoadingEnum): LoadingState => ({
  isIdle: loadingState === StoreLoadingEnum.idle,
  isPending: loadingState === StoreLoadingEnum.pending,
  isLoaded: loadingState === StoreLoadingEnum.loaded,
});