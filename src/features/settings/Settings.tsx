import React from 'react'
import { useSelector } from 'react-redux'

import { RootState } from '../../app/store'
import { MULTI_PHRASE } from '../settingsSlice'

import HowToShowPreEditText from './HowToShowPreEditText'
import UnitOfConversion from './UnitOfConversion'

const Settings: React.FC = () => {
  const unitOfConversion = useSelector((state: RootState) => state.settings.unitOfConversion)

  return (
    <div>
      <form>
        <HowToShowPreEditText />
        <UnitOfConversion />
        {unitOfConversion === MULTI_PHRASE && (
          <fieldset>
            <legend>連文節変換方式</legend>
          <input
            type="radio"
            id="n-phrases"
            // onClick={() => dispatch(setUnitOfConversion(SINGLE_WORD))}
            // checked={unitOfConversion === SINGLE_WORD}
          />
          <label htmlFor="n-phrases">n文節最長一致法</label>
          </fieldset>
        )}
      </form>
    </div>
  )
}

export default Settings
