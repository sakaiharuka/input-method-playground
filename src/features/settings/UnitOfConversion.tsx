import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { RootState } from '../../app/store'
import {
  setUnitOfConversion,
  SINGLE_WORD, SINGLE_PHRASE, MULTI_PHRASE
} from '../settingsSlice'

const UnitOfConversion: React.FC = () => {
  const unitOfConversion = useSelector((state: RootState) => state.settings.unitOfConversion)
  const dispatch = useDispatch()

  return (
    <fieldset>
      <legend>変換単位</legend>
      <input
        type="radio"
        id="single-word"
        onClick={() => dispatch(setUnitOfConversion(SINGLE_WORD))}
        checked={unitOfConversion === SINGLE_WORD}
      />
      <label htmlFor="single-word">単語変換</label>
      <input
        type="radio"
        id="single-phrase"
        onClick={() => dispatch(setUnitOfConversion(SINGLE_PHRASE))}
        checked={unitOfConversion === SINGLE_PHRASE}
      />
      <label htmlFor="single-phrase">単文節変換</label>
      <input
        type="radio"
        id="multi-phrase"
        onClick={() => dispatch(setUnitOfConversion(MULTI_PHRASE))}
        checked={unitOfConversion === MULTI_PHRASE}
      />
      <label htmlFor="multi-phrase">連文節変換</label>
    </fieldset>
  )
}

export default UnitOfConversion
