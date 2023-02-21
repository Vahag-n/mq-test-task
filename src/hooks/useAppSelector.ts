import { TypedUseSelectorHook, useSelector } from 'react-redux';

import { RootState } from 'storage/types';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
