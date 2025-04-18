import { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/redux-hook'
import { selectLinksList } from './waLinkGeneratorSelectors'

import { ITemplates } from '@/types'
import { generateLink, setMessage, setPhone } from './waLinkGeneratorSlice'

import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
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

export default function WaLinkGenerator() {
  const dispatch = useAppDispatch()
  const { phone, message, generatedLink, errors } = useAppSelector(
    state => state.waLinkGenerator,
  )

  // radio checked state
  const [selectedOption, setSelectedOption] = useState<
    'option-one' | 'option-two'
  >('option-one')
  const isDisabledUserOptions = selectedOption !== 'option-one'

  // By manual message
  const [userPhone, setUserPhone] = useState(phone)
  const [userMessage, setUserMessage] = useState(message)

  // By template
  const [unitName, setUnitName] = useState<string>('')
  const [unitNumber, setUnitNumber] = useState<string>('')
  const [unitLocation, setUnitLocation] = useState<string>('')

  const TEMPLATES: ITemplates = {
    'Preset-1': `Здравствуйте, меня интересует ${unitName} в ${unitLocation} из email. Пришлите, пожалуйста, все материалы`,
    'Preset-2': `Здравствуйте, меня интересует лот №${unitNumber} ${unitName} в ${unitLocation} из email. Пришлите, пожалуйста, все материалы`,
  }

  const [selectedTemplateKey, setSelectedTemplateKey] = useState<string>('')

  const selectedTemplate = selectedTemplateKey
    ? TEMPLATES[selectedTemplateKey]
    : ''

  const isDisabledUnitNumber =
    isDisabledUserOptions || selectedTemplateKey === 'Preset-1'

  // Generate message by template or manual
  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault()

    dispatch(setPhone(userPhone))

    // For using one field for template and manual message
    if (selectedOption === 'option-one') {
      dispatch(setMessage(selectedTemplate))
    } else {
      dispatch(setMessage(userMessage))
    }

    dispatch(generateLink())
  }

  // Get the links list and save list local
  const linksList = useAppSelector(selectLinksList)

  useEffect(() => {
    localStorage.setItem('whatsapp-links', JSON.stringify(linksList))
  }, [linksList])

  // Copy link to clipboard and run toast on click
  const runCopyToast =
    (source: string, text: string) => (e: React.MouseEvent) => {
      e.preventDefault() // Чтобы ссылка не срабатывала
      navigator.clipboard
        .writeText(source)
        .then(() => toast.message(text))
        .catch(() => toast.message('Copy failed'))
    }

  return (
    <div>
      <form
        className="mb-5 bg-(--card) p-7 rounded-lg"
        onSubmit={handleGenerate}
      >
        <div className="mb-5">
          <RadioGroup
            className="flex gap-5"
            value={selectedOption}
            onValueChange={(value: 'option-one' | 'option-two') =>
              setSelectedOption(value)
            }
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option-one" id="option-one" />
              <Label className="cursor-pointer" htmlFor="option-one">
                By template
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option-two" id="option-two" />
              <Label className="cursor-pointer" htmlFor="option-two">
                Manual
              </Label>
            </div>
          </RadioGroup>
        </div>

        <div className="mb-5">
          <div id="templateSelector" className="mb-5">
            <div className="mb-3">
              <Select
                disabled={isDisabledUserOptions}
                value={selectedTemplateKey}
                onValueChange={value => setSelectedTemplateKey(value)}
              >
                <SelectTrigger className="w-full bg-(--input-bg) border-0 cursor-pointer">
                  <SelectValue placeholder="Select template" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem className="cursor-pointer" value="Preset-1">
                    Without unit number
                  </SelectItem>
                  <SelectItem className="cursor-pointer" value="Preset-2">
                    With unit number
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-3 max-[630px]:flex-col">
              <Input
                disabled={isDisabledUserOptions}
                className="bg-(--input-bg) border-0"
                type="text"
                placeholder="Unit name"
                value={unitName}
                onChange={e => setUnitName(e.target.value)}
              />
              <Input
                disabled={isDisabledUserOptions}
                className="bg-(--input-bg) border-0"
                type="text"
                placeholder="Unit Location"
                value={unitLocation}
                onChange={e => setUnitLocation(e.target.value)}
              />
              <Input
                disabled={isDisabledUnitNumber}
                className="bg-(--input-bg) border-0"
                type="text"
                placeholder="Unit number"
                value={unitNumber}
                onChange={e => setUnitNumber(e.target.value)}
              />
            </div>
          </div>

          <div id="manualMessage">
            <p className="mb-2">Your message</p>
            <div className="flex">
              <Input
                className="bg-(--input-bg) border-0"
                type="text"
                value={
                  selectedOption === 'option-one'
                    ? selectedTemplate
                    : userMessage
                }
                onChange={e => setUserMessage(e.target.value)}
              />
            </div>
            {errors.messageError && (
              <p className="mt-1 text-sm text-(--error)">
                {errors.messageError}
              </p>
            )}
          </div>
        </div>

        <div>
          <p className="mb-2">WhatsApp phone number</p>
          <div className="flex">
            <Input
              className="bg-(--input-bg) rounded-r-none border-0"
              type="text"
              placeholder="79999999999"
              value={userPhone}
              onChange={e => setUserPhone(e.target.value)}
            />
            <Button className="rounded-l-none cursor-pointer" type="submit">
              Generate
            </Button>
          </div>
          {errors.phoneError && (
            <p className="mt-1 text-sm text-(--error)">{errors.phoneError}</p>
          )}
        </div>
      </form>
      <div className="mb-5 bg-(--card) p-7 rounded-lg">
        <p className="mb-2">Your link will appear here</p>
        <Textarea
          className="min-h-30 mb-5 bg-(--input-bg} border-0 bg-(--input-bg)"
          value={generatedLink}
        />
        <div className="flex gap-3">
          <Button
            className="cursor-pointer"
            disabled={!generatedLink}
            onClick={runCopyToast(generatedLink, 'Link copied to clipboard')}
          >
            Copy link
          </Button>
          <a href={generatedLink} target="_blank">
            <Button
              disabled={!generatedLink}
              className="border-1 border-(--primary) text-(--primary) hover:text-(--accent) bg-background-0 bg-transparent cursor-pointer"
            >
              Open link
            </Button>
          </a>
        </div>
      </div>

      <div className=" bg-(--card) p-7 pt-5 pb-5 rounded-lg">
        <Accordion type="single" collapsible>
          <AccordionItem value="lastLinksList">
            <AccordionTrigger className="p-0 text-md font-semibold hover:no-underline">
              Your last links
            </AccordionTrigger>
            <AccordionContent className="mt-5 pt-5 border-t-2">
              <ul>
                {linksList.map(link => (
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
