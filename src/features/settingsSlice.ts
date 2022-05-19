import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface SettingsState {
  howToShowPreEditText: number
}

export const ON_THE_SPOT = 0
export const OVER_THE_SPOT = 1
export const OFF_THE_SPOT = 2

const initialState: SettingsState = {
  howToShowPreEditText: OFF_THE_SPOT,
}

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setHowToShowPreEditText: (state, action: PayloadAction<number>) => {
      state.howToShowPreEditText = action.payload
    },
  },
})

export const { setHowToShowPreEditText } = settingsSlice.actions

export default settingsSlice.reducer
