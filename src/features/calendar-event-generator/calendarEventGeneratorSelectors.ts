import { RootState } from "@/store";

export const selectEventsList = (state: RootState) => state.calendarEventGenerator.lastEventsList