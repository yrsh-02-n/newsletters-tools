import { IWhatsAppLinkState } from "@/types";
import { formatDateTime } from "@/utils/dateFormatter";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const BASE_URL: string = 'https://api.whatsapp.com/send/?phone='

const getInitialState = (): IWhatsAppLinkState => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('whatsapp-links');
    return {
      generatedLink: '',
      phone: '',
      message: '',
      lastLinksList: saved ? JSON.parse(saved) : [],
      errors: { phoneError: null, messageError: null }
    };
  }
  return initialState;
};

const initialState: IWhatsAppLinkState = getInitialState();

const waLinkGeneratorSlice = createSlice({
  name: 'waLinkGenerator',
  initialState,
  reducers: {
    setPhone: (state, action: PayloadAction<string>) => {
      state.phone = action.payload.replace(/\D/g, '')
    },
    setMessage: (state, action: PayloadAction<string>) => {
      state.message = action.payload
    },
    generateLink: (state) => {
      // Fields validation checking
      if (!state.message) {
        state.errors.messageError = 'Field is empty';
        return
      }
      if (!state.phone.match(/^\d+$/)) {
        state.errors.phoneError = 'This field should contain only numbers';
        return
      }

      // Generate from fields values
      const encodedMessage = encodeURIComponent(state.message)
      const newGeneratedLink = `${BASE_URL}${state.phone}&text=${encodedMessage}&type=phone_number&app_absent=0`;

      const newLink = {
        linkAddress: newGeneratedLink,
        linkDate: formatDateTime()
      };

      return {
        ...state,
        generatedLink: newGeneratedLink,
        errors: {
          phoneError: null,
          messageError: null
        },
        lastLinksList: [newLink, ...state.lastLinksList].slice(0, 5)
      };
    },
  },
})

export const {
  setPhone,
  setMessage,
  generateLink,
} = waLinkGeneratorSlice.actions
export default waLinkGeneratorSlice.reducer