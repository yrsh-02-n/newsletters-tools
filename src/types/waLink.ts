export interface IWhatsAppLinkState {
  phone: string
  message: string
  generatedLink: string
  lastLinksList: { linkAddress: string, linkDate: string }[]
  errors: {
    phoneError: string | null
    messageError: string | null
  }
}

export interface ITemplates {
  [key: string]: string
}