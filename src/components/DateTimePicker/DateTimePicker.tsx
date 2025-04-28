import { useState, useRef, useEffect, ChangeEventHandler } from 'react'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { CalendarIcon, Clock } from 'lucide-react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

import { formatDateTime } from '@/utils/dateFormatter'

interface DateTimePickerProps {
  value?: Date | null
  onChange: (date: Date | null) => void
  placeholder?: string
}

export const DateTimePicker = ({
  value,
  onChange,
  placeholder = 'Select date and time',
}: DateTimePickerProps) => {
  const [month, setMonth] = useState(new Date())
  const [timeValue, setTimeValue] = useState<string>('00:00')

  // Pick time by btn in input
  const timeInputRef = useRef<HTMLInputElement>(null)

  // initialize time on value change
  useEffect(() => {
    if (value) {
      setTimeValue(
        `${String(value.getHours()).padStart(2, '0')}:${String(
          value.getMinutes(),
        ).padStart(2, '0')}`,
      )
      setMonth(value)
    }
  }, [value])

  const handleClickBtn = () => {
    timeInputRef.current?.showPicker()
  }

  // Time change handler
  const handleTimeChange: ChangeEventHandler<HTMLInputElement> = e => {
    const time = e.target.value
    setTimeValue(time)

    if (!value) {
      // if date is not selected: create new with current date and time
      const now = new Date()
      const [hours, minutes] = time.split(':').map(Number)
      now.setHours(hours, minutes)
      onChange(now)
    } else {
      // update time only for current date
      const [hours, minutes] = time.split(':').map(Number)
      const newDate = new Date(value)
      newDate.setHours(hours, minutes)
      onChange(newDate)
    }
  }

  // Pick date and time in input
  // (https://daypicker.dev/guides/input-fields)
  const handleDateSelect = (date: Date | undefined) => {
    if (!date) {
      onChange(null)
      return
    }

    // Save on changing
    if (timeValue) {
      const [hours, minutes] = timeValue.split(':').map(Number)
      date.setHours(hours, minutes)
    }

    onChange(date)
  }

  // Formatted input value
  const calendarSelectedValue = value === null ? undefined : value
  const displayValue = value ? formatDateTime(value) : placeholder

  return (
    <div className="w-full flex gap-x-3 mb-2">
      {/* Start date picker */}
      <div className="w-full relative flex-1">
        <Input
          className="w-full bg-(--input-bg) border-0 pl-3 pr-10"
          value={displayValue}
          readOnly
        />
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
            >
              <CalendarIcon className="h-4 w-4 opacity-70" />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-auto p-0 bg-(--card) text-(--foreground)"
            align="end"
          >
            <Calendar
              mode="single"
              selected={calendarSelectedValue}
              onSelect={handleDateSelect}
              month={month}
              onMonthChange={setMonth}
              initialFocus
            />
            <div className="pl-5 pr-5 pb-5 w-full">
              <label className="flex flex-col gap-2">
                <div className="relative flex-1">
                  <Input
                    id="time"
                    type="time"
                    className="w-full bg-(--input-bg) border-0 block"
                    ref={timeInputRef}
                    value={timeValue}
                    onChange={handleTimeChange}
                  />
                  <Button
                    onClick={handleClickBtn}
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                  >
                    <Clock className="h-4 w-4 opacity-70" />
                  </Button>
                </div>
              </label>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}
