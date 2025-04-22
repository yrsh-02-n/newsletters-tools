import { useState } from 'react'

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

import { ITimezones } from '@/types/timezones'
import { timezones } from '@/data/timezones'

import { DateTimePicker } from '@/components/DateTimePicker/DateTimePicker'

export default function CalendarEventGenerator() {
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()
  const timezonesList: ITimezones[] = timezones

  return (
    <div>
      {/* Date and time */}
      <form className="mb-5 bg-(--card) p-7 rounded-lg">
        <p className="mb-2">Date and time of event</p>
        <div className="flex gap-3 mb-2">
          <DateTimePicker
            value={startDate}
            onChange={setStartDate}
            placeholder="Start date and time"
          />
          <DateTimePicker
            value={endDate}
            onChange={setEndDate}
            placeholder="End date and time"
          />
        </div>

        {/* Event title */}
        <div>
          <p className="mb-2">The name of the event</p>
          <Input className="bg-(--input-bg) border-0 mb-3"></Input>
          <p className="mb-2">Description of the event</p>
          <Textarea className="min-h-20 mb-5 bg-(--input-bg} border-0 bg-(--input-bg)" />
        </div>

        {/* Event description */}
        <div className="flex gap-3 mb-2">
          <div className="w-full">
            <p className="mb-2">Time zone</p>
            <Select
            // value='{selectedTemplateKey}'
            // onValueChange={value => setSelectedTemplateKey(value)}
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
          <div className="w-full">
            <p className="mb-2">Location</p>
            <Input className="bg-(--input-bg) border-0 w-full"></Input>
          </div>
        </div>
      </form>

      {/* Generated link */}
      <div className="mb-5 bg-(--card) p-7 rounded-lg">
        <p className="mb-2">Your link will appear here</p>
        <Textarea
          className="min-h-30 mb-5 bg-(--input-bg} border-0 bg-(--input-bg)"
          // value={generatedLink}
        />
        <div className="flex gap-3">
          <Button
            className="cursor-pointer"
            // disabled={!generatedLink}
            // onClick={runCopyToast(generatedLink, 'Link copied to clipboard')}
          >
            Copy link
          </Button>
          <Button
            className="border-1 border-(--primary) text-(--primary) hover:text-(--accent) bg-background-0 bg-transparent cursor-pointer"
            // onClick={() =>
            //   window.open(generatedLink, '_blank', 'noopener,noreferrer')
            // }
            // disabled={!generatedLink}
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
            <AccordionContent className="mt-5 pt-5 border-t-2"></AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
}
