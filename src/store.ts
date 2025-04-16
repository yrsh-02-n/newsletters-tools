import { configureStore, combineReducers } from '@reduxjs/toolkit';

import waLinkGenerator from '@/features/waLinkGenerator/waLinkGeneratorSlice'

const rootReducer = combineReducers({
  waLinkGenerator: waLinkGenerator,
})

export const store = configureStore({
  reducer: rootReducer
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;