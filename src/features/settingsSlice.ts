import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface SettingsState {
  howToShowPreEditText: number
  unitOfConversion: number
}

export const ON_THE_SPOT = 0
export const OVER_THE_SPOT = 1
export const OFF_THE_SPOT = 2

export const SINGLE_WORD = 0
export const SINGLE_PHRASE = 1
export const MULTI_PHRASE = 2

const initialState: SettingsState = {
  howToShowPreEditText: OFF_THE_SPOT,
  unitOfConversion: SINGLE_WORD
}

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setHowToShowPreEditText: (state, action: PayloadAction<number>) => {
      state.howToShowPreEditText = action.payload
    },
    setUnitOfConversion: (state, action: PayloadAction<number>) => {
      state.unitOfConversion = action.payload
    }
  },
})

export const { setHowToShowPreEditText, setUnitOfConversion } = settingsSlice.actions

export default settingsSlice.reducer
