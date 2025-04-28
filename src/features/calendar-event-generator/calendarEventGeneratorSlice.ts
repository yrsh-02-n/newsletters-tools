import { ICalendargeneratorState } from "@/types/calendarGenerator"
import { formatForGoogleCalendar, formatDateTime } from "@/utils/dateFormatter"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const BASE_URL: string = 'https://calendar.google.com/calendar/u/0/r/eventedit?text='

const getInitialState = (): ICalendargeneratorState => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('calendar-events');
    return {
      eventBeginningDate: null,
      eventEndingDate: null,
      eventTitle: '',
      eventDescription: '',
      eventTimeZone: '',
      eventLocation: '',
      eventGeneratedLink: '',
      lastEventsList: saved ? JSON.parse(saved) : [],
    }
  }
  return {
    eventBeginningDate: null,
    eventEndingDate: null,
    eventTitle: '',
    eventDescription: '',
    eventTimeZone: '',
    eventLocation: '',
    eventGeneratedLink: '',
    lastEventsList: [],
  }
}

const calendarEventGeneratorSlice = createSlice({
  name: 'calendarEventGenerator',
  initialState: getInitialState(),
  reducers: {
    setEventBeginningDate: (state, action: PayloadAction<Date | undefined>) => {
      state.eventBeginningDate = action.payload ? action.payload.toISOString() : null
    },
    setEventEndingDate: (state, action: PayloadAction<Date | undefined>) => {
      state.eventEndingDate = action.payload ? action.payload.toISOString() : null
    },
    setEventTitle: (state, action: PayloadAction<string>) => {
      state.eventTitle = action.payload
    },
    setEventDescription: (state, action: PayloadAction<string>) => {
      state.eventDescription = action.payload
    },
    setEventTimeZone: (state, action: PayloadAction<string>) => {
      state.eventTimeZone = action.payload
    },
    setEventLocation: (state, action: PayloadAction<string>) => {
      state.eventLocation = action.payload
    },
    generateEventLink: (state) => {
      if (!state.eventBeginningDate || !state.eventEndingDate) {
        return state
      }

      // convert string into Date
      const beginningDate = new Date(state.eventBeginningDate)
      const endingDate = new Date(state.eventEndingDate)

      // clear whitespaces in timezone
      const fixedTimeZone = state.eventTimeZone
        .replace(/\s+/g, '')
        .replace(/\/+/g, '/')

      const encodedTitle = encodeURIComponent(state.eventTitle)
      const encodedDescription = encodeURIComponent(state.eventDescription)
      const encodedLocation = encodeURIComponent(state.eventLocation)

      const formattedBeginningDate = formatForGoogleCalendar(beginningDate)
      const formattedEndingDate = formatForGoogleCalendar(endingDate)

      const newGeneratedLink = `${BASE_URL}${encodedTitle}&dates=${formattedBeginningDate}/${formattedEndingDate}&ctz=${fixedTimeZone}&details=${encodedDescription}&location=${encodedLocation}&addtocalendar&sf=true&output=xml`

      const newLink = {
        linkAddress: newGeneratedLink,
        linkDate: formatDateTime(new Date())
      }

      // LocalStorage
      const updatedEvents = [newLink, ...state.lastEventsList.slice(0, 9)]
      if (typeof window !== 'undefined') {
        localStorage.setItem('calendar-events', JSON.stringify(updatedEvents))
      }

      return {
        ...state,
        eventGeneratedLink: newGeneratedLink,
        lastEventsList: updatedEvents
      }
    }
  }
})

export const {
  setEventBeginningDate,
  setEventEndingDate,
  setEventTitle,
  setEventDescription,
  setEventTimeZone,
  setEventLocation,
  generateEventLink } = calendarEventGeneratorSlice.actions

export default calendarEventGeneratorSlice.reducer





