import { useState, useEffect } from 'react'

import {
  toggleTheme,
  getSavedTheme,
} from '@/features/themeSwitcher/themeHandler'
import { MoonIcon, SunIcon } from 'lucide-react'
import { Switch } from '@/components/ui/switch'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import WaLinkGenerator from '@/features/waLinkGenerator/WaLinkGenerator'
import { Toaster } from 'sonner'

function App() {
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>(
    getSavedTheme(),
  )

  useEffect(() => {
    document.documentElement.className = currentTheme
    document.documentElement.setAttribute('data-theme', currentTheme)
  }, [])

  const handleThemeToggle = () => {
    const newTheme = toggleTheme(currentTheme)
    setCurrentTheme(newTheme)
  }

  return (
    <div className="container m-auto max-w-[800px] p-5">
      <div className="flex justify-between mb-5">
        <h1 className="font-bold text-xl sm:text-2xl">Newsletters Tools</h1>
        <div className="flex items-center">
          <SunIcon size={20} />
          <Switch
            className="ml-2 mr-2"
            checked={currentTheme === 'dark'}
            onCheckedChange={handleThemeToggle}
          />
          <MoonIcon size={20} />
        </div>
      </div>
      <Tabs defaultValue="wa-link" className="w-full">
        <TabsList className="w-full mb-5 border-0">
          <TabsTrigger className="border-0" value="wa-link">WhatsApp link</TabsTrigger>
          <TabsTrigger
            className="border-0"
            value="calendar"
            disabled
          >
            Calendar event (soon)
          </TabsTrigger>
        </TabsList>
        <TabsContent value="wa-link">
          <WaLinkGenerator />
        </TabsContent>
        <TabsContent value="calendar">Coming soon</TabsContent>
      </Tabs>
      <Toaster />
    </div>
  )
}

export default App
