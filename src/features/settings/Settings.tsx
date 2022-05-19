import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { RootState } from '../../app/store'
import { setHowToShowPreEditText, ON_THE_SPOT, OVER_THE_SPOT, OFF_THE_SPOT} from '../settingsSlice'

const Settings: React.FC = () => {
  const howToShowPreEditText = useSelector((state: RootState) => state.settings.howToShowPreEditText)
  const dispatch = useDispatch()

  return (
    <div style={{ width: '40em' }}>
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
      </form>
    </div>
  )
}

export default Settings
