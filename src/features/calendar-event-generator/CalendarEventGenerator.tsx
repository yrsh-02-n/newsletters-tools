import { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/redux-hook'
import { selectEventsList } from './calendarEventGeneratorSelectors'

import {
  setEventBeginningDate,
  setEventEndingDate,
  setEventTitle as setReduxEventTitle,
  setEventDescription as setReduxEventDescription,
  setEventTimeZone,
  setEventLocation,
  generateEventLink,
} from './calendarEventGeneratorSlice'

import { ITimezones } from '@/types/timezones'
import { timezones } from '@/data/timezones'

import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { toast } from 'sonner'

import { DateTimePicker } from '@/components/DateTimePicker/DateTimePicker'

export default function CalendarEventGenerator() {
  const dispatch = useAppDispatch()
  const timezonesList: ITimezones[] = timezones
  const { eventGeneratedLink, errors } = useAppSelector(
    state => state.calendarEventGenerator,
  )

  // Get date and time
  const [startDate, setStartDate] = useState<Date | undefined>(undefined)
  const [endDate, setEndDate] = useState<Date | undefined>(undefined)

  // Other fields
  const [eventTitle, setEventTitle] = useState('')
  const [eventDescription, setEventDescription] = useState('')
  const [timeZone, setTimeZone] = useState('')
  const [location, setLocation] = useState('')

  // Generate link
  const handleGenerateLink = (e: React.FormEvent) => {
    e.preventDefault()

    // Dispatch data
    dispatch(setEventBeginningDate(startDate))
    dispatch(setEventEndingDate(endDate))
    dispatch(setReduxEventTitle(eventTitle))
    dispatch(setReduxEventDescription(eventDescription))
    dispatch(setEventTimeZone(timeZone))
    dispatch(setEventLocation(location))
    dispatch(generateEventLink())
  }

  // Get the links list and save list local
  const eventsLinksList = useAppSelector(selectEventsList)

  useEffect(() => {
    localStorage.setItem('events-links', JSON.stringify(eventsLinksList))
  }, [eventsLinksList])

  // Copy link to clipboard and run toast on click
  const runCopyToast =
    (source: string, text: string) => (e: React.MouseEvent) => {
      e.preventDefault()
      navigator.clipboard
        .writeText(source)
        .then(() => toast.message(text))
        .catch(() => toast.message('Copy failed'))
    }

  return (
    <div>
      {/* Event date and time */}
      <form
        className="mb-5 bg-(--card) p-7 rounded-lg"
        onSubmit={handleGenerateLink}
      >
        <p className="mb-2">Date and time of event</p>
        <div className="mb-2">
          <div className="flex gap-x-3 gap-y-0">
            <DateTimePicker
              value={startDate ?? undefined}
              onChange={date => setStartDate(date ?? undefined)}
              placeholder="Start date and time"
            />
            <DateTimePicker
              value={endDate ?? undefined}
              onChange={date => setEndDate(date ?? undefined)}
              placeholder="End date and time"
            />
          </div>
          <div>
            {errors.dateError && (
              <p className="text-sm text-(--error)">{errors.dateError}</p>
            )}
          </div>
        </div>

        {/* Event title and description */}
        <div>
          <div className="mb-3">
            <p className="mb-2">The name of the event</p>
            <Input
              className="bg-(--input-bg) border-0"
              value={eventTitle}
              onChange={e => setEventTitle(e.target.value)}
            />
            <div>
              {errors.dateError && (
                <p className="text-sm text-(--error) mt-1">
                  {errors.titleError}
                </p>
              )}
            </div>
          </div>
          <p className="mb-2">Description of the event</p>
          <Textarea
            className="min-h-20 mb-5 bg-(--input-bg} border-0 bg-(--input-bg)"
            value={eventDescription}
            onChange={e => setEventDescription(e.target.value)}
          />
        </div>

        {/* Event time zone select */}
        <div className="flex gap-3 mb-2">
          <div className="w-full">
            <p className="mb-2">Time zone</p>
            <Select
              value={timeZone}
              onValueChange={value => setTimeZone(value)}
            >
              <SelectTrigger className="w-full bg-(--input-bg) border-0 cursor-pointer">
                <SelectValue placeholder="Select timezone, GMT" />
              </SelectTrigger>
              <SelectContent>
                {timezonesList.map((zone: ITimezones) => (
                  <SelectItem
                    key={zone.zone}
                    value={zone.zone}
                    className="cursor-pointer"
                  >
                    {zone.gmt} {zone.zone}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Event location */}
          <div className="w-full mb-3">
            <p className="mb-2">Location</p>
            <Input
              className="bg-(--input-bg) border-0 w-full"
              value={location}
              onChange={e => setLocation(e.target.value)}
            ></Input>
          </div>
        </div>
        <div>
          <Button className="cursor-pointer" type="submit">
            Generate
          </Button>
        </div>
      </form>

      {/* Generated link */}
      <div className="mb-5 bg-(--card) p-7 rounded-lg">
        <p className="mb-2">Your link will appear here</p>
        <Textarea
          className="min-h-30 mb-5 bg-(--input-bg} border-0 bg-(--input-bg)"
          value={eventGeneratedLink}
        />
        <div className="flex gap-3">
          <Button
            className="cursor-pointer"
            disabled={!eventGeneratedLink}
            onClick={runCopyToast(
              eventGeneratedLink,
              'Link copied to clipboard',
            )}
          >
            Copy link
          </Button>
          <Button
            className="border-1 border-(--primary) text-(--primary) hover:text-(--accent) bg-background-0 bg-transparent cursor-pointer"
            disabled={!eventGeneratedLink}
            onClick={() =>
              window.open(eventGeneratedLink, '_blank', 'noopener,noreferrer')
            }
          >
            Open link
          </Button>
        </div>
      </div>

      {/* Previous  */}
      <div className=" bg-(--card) p-7 pt-5 pb-5 rounded-lg">
        <Accordion type="single" collapsible>
          <AccordionItem value="lastLinksList">
            <AccordionTrigger className="p-0 text-md font-semibold hover:no-underline">
              Your last events
            </AccordionTrigger>
            <AccordionContent className="mt-5 pt-5 border-t-2">
              <ul>
                {eventsLinksList.map(link => (
                  <li
                    key={link.linkDate}
                    className="flex justify-between not-last:mb-2"
                  >
                    <a href={link.linkAddress} target="_blank">
                      {link.linkDate}
                    </a>
                    <button
                      className="cursor-pointer"
                      onClick={runCopyToast(
                        link.linkAddress,
                        'Link copied to clipboard',
                      )}
                    >
                      Copy link
                    </button>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
}
