export interface ICalendargeneratorState {
  eventBeginningDate: string | null,
  eventEndingDate: string | null,
  eventTitle: string,
  eventDescription: string,
  eventTimeZone: string,
  eventLocation: string,
  eventGeneratedLink: string,
  lastEventsList: { linkAddress: string, linkDate: string }[],
  errors: {
    dateError: string | null,
    titleError: string | null
  }
}
