import React from 'react'
import { useSelector } from 'react-redux'

import { RootState } from '../app/store'
import { OFF_THE_SPOT, OVER_THE_SPOT } from '../features/settingsSlice'

type Props = {
  preEditText: {
    composed: string
    composing: string
  }
  caretPos: {
    top: number
    left: number
  }
}

const PreEditText: React.FC<Props> = (props: Props) => {
  const { preEditText, caretPos } = props

  const howToShowPreEditText = useSelector((state: RootState) => state.settings.howToShowPreEditText)

  return (
    <>
      {howToShowPreEditText === OVER_THE_SPOT && `${preEditText.composed}${preEditText.composing}`.length > 0 && (
        <div
          className='pre-edit-text-over-the-spot'
          style={{
            backgroundColor: '#000',
            color: '#fff',
            position: 'absolute',
            top: caretPos.top,
            left: caretPos.left
          }}
        >
          {(preEditText.composed + preEditText.composing).length > 0 ? preEditText.composed + preEditText.composing : (<>&nbsp;</>)}
        </div>
      )}
      {howToShowPreEditText === OFF_THE_SPOT && (
        <div
          data-testid="pre-edit-text-off-the-spot"
          className="pre-edit-text-off-the-spot"
          style={{ position: 'static' }}
        >
          {(preEditText.composed + preEditText.composing).length > 0 ? preEditText.composed + preEditText.composing : (<>&nbsp;</>)}
        </div>
      )}
    </>
  )
}

export default PreEditText
