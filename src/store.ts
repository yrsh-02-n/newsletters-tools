import { configureStore, combineReducers } from '@reduxjs/toolkit';

import waLinkGenerator from '@/features/waLinkGenerator/waLinkGeneratorSlice'
import calendarEventGenerator from '@/features/calendar-event-generator/calendarEventGeneratorSlice'

const rootReducer = combineReducers({
  waLinkGenerator: waLinkGenerator,
  calendarEventGenerator: calendarEventGenerator
})

export const store = configureStore({
  reducer: rootReducer
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;