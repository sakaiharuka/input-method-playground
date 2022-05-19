import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { RootState } from '../../app/store'
import {
  setHowToShowPreEditText, setUnitOfConversion,
  ON_THE_SPOT, OVER_THE_SPOT, OFF_THE_SPOT,
  SINGLE_WORD, SINGLE_PHRASE, MULTI_PHRASE
} from '../settingsSlice'

const Settings: React.FC = () => {
  const howToShowPreEditText = useSelector((state: RootState) => state.settings.howToShowPreEditText)
  const unitOfConversion = useSelector((state: RootState) => state.settings.unitOfConversion)
  const dispatch = useDispatch()

  return (
    <div>
      <form>
        <fieldset>
          <legend>未確定文字列の表示方式</legend>
          <input
            disabled
            type="radio"
            id="on-the-spot"
            onClick={(e) => dispatch(setHowToShowPreEditText(ON_THE_SPOT))}
            checked={howToShowPreEditText === ON_THE_SPOT}
          />
          <label htmlFor="on-the-spot">on-the-spot</label>
          <input
            disabled
            type="radio"
            id="over-the-spot"
            onClick={() => dispatch(setHowToShowPreEditText(OVER_THE_SPOT))}
            checked={howToShowPreEditText === OVER_THE_SPOT}
          />
          <label htmlFor="over-the-spot">over-the-spot</label>
          <input
            type="radio"
            id="off-the-spot"
            onClick={() => dispatch(setHowToShowPreEditText(OFF_THE_SPOT))}
            checked={howToShowPreEditText === OFF_THE_SPOT}
          />
          <label htmlFor="off-the-spot">off-the-spot</label>
        </fieldset>
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
            disabled
            type="radio"
            id="single-phrase"
            onClick={() => dispatch(setUnitOfConversion(SINGLE_PHRASE))}
            checked={unitOfConversion === SINGLE_PHRASE}
          />
          <label htmlFor="single-phrase">単文節変換</label>
          <input
            disabled
            type="radio"
            id="multi-phrase"
            onClick={() => dispatch(setUnitOfConversion(MULTI_PHRASE))}
            checked={unitOfConversion === MULTI_PHRASE}
          />
          <label htmlFor="multi-phrase">連文節変換</label>
        </fieldset>
      </form>
    </div>
  )
}

export default Settings
