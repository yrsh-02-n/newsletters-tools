import { ICalendargeneratorState } from "@/types/calendarGenerator"
import { formatForGoogleCalendar, formatDateTime } from "@/utils/dateFormatter"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const BASE_URL: string = 'https://calendar.google.com/calendar/u/0/r/eventedit?text='

const getInitialState = (): ICalendargeneratorState => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('events-links');
    return {
      eventBeginningDate: null,
      eventEndingDate: null,
      eventTitle: '',
      eventDescription: '',
      eventTimeZone: '',
      eventLocation: '',
      eventGeneratedLink: '',
      lastEventsList: saved ? JSON.parse(saved) : [],
      errors: {
        dateError: null,
        titleError: null
      }
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
    errors: {
      dateError: null,
      titleError: null
    }
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
      // Dates and name check
      if (!state.eventBeginningDate || !state.eventEndingDate) {
        state.errors.dateError = 'Please select both start and end dates'
        return state
      }
      if (!state.eventTitle) {
        state.errors.titleError = 'Please enter event name'
        return state
      }

      // convert string into Date
      const beginningDate = new Date(state.eventBeginningDate)
      const endingDate = new Date(state.eventEndingDate)

      // clear whitespaces in timezone
      const fixedTimeZone = state.eventTimeZone
        .replace(/\s+/g, '')
        .replace(/\/+/g, '/')

      // Encode strings
      const encodedTitle = encodeURIComponent(state.eventTitle)
      const encodedDescription = encodeURIComponent(state.eventDescription)
      const encodedLocation = encodeURIComponent(state.eventLocation)

      // Format dates
      const formattedBeginningDate = formatForGoogleCalendar(beginningDate)
      const formattedEndingDate = formatForGoogleCalendar(endingDate)

      // Generate link from data
      const newGeneratedLink = `${BASE_URL}${encodedTitle}&dates=${formattedBeginningDate}/${formattedEndingDate}&ctz=${fixedTimeZone}&details=${encodedDescription}&location=${encodedLocation}&addtocalendar&sf=true&output=xml`

      const newLink = {
        linkAddress: newGeneratedLink,
        linkDate: formatDateTime(new Date())
      }

      return {
        ...state,
        eventGeneratedLink: newGeneratedLink,
        errors: { dateError: null, titleError: null },
        lastEventsList: [newLink, ...state.lastEventsList].slice(0, 5)
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





