import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { searchKey, romanTable } from '../lib/roman'
import { RootState } from '../app/store'
import { setHowToShowPreEditText, ON_THE_SPOT, OVER_THE_SPOT, OFF_THE_SPOT} from '../features/settingsSlice'

import './TextBox.css'

type PreEditText = {
  composed: string
  composing: string
}

const TextBox: React.FC = () => {
  const howToShowPreEditText = useSelector((state: RootState) => state.settings.howToShowPreEditText)

  const [text, setText] = useState('')
  const [preEditText, setPreEditText] = useState<PreEditText>({
    composed: '',
    composing: ''
  })

  const handleInput: React.KeyboardEventHandler = (e) => {
    if (!e.altKey && !e.ctrlKey && !e.metaKey && !e.shiftKey) {
      switch (e.code) {
        case 'Enter':
          setText(text + preEditText.composed + preEditText.composing)
          setPreEditText({
            composed: '',
            composing: ''
          })
          break
        case 'Backspace':
          if (preEditText.composing.length > 0) {
            setPreEditText({
              composed: preEditText.composed,
              composing: preEditText.composing.slice(0, -1)
            })
          } else if (preEditText.composed.length > 0) {
            setPreEditText({
              composed: preEditText.composed.slice(0, -1),
              composing: preEditText.composing
            })
          } else {
            setText(text.slice(0, -1))
          }
          break
        case 'Escape':
          break
        case 'Space':
          break
        default:
          e.preventDefault()
          const roman = preEditText.composing + e.key
          const romanKey = searchKey(roman)
          if (romanKey.length > 0) {
            setPreEditText({
              composed: preEditText.composed + roman.slice(0, roman.length - romanKey.length) + romanTable[romanKey][0],
              composing: ''
            })
          } else {
            setPreEditText({
              composed: preEditText.composed,
              composing: roman
            })
          }
      }
    }
  }

  const handleClick: React.MouseEventHandler = (e) => {
    console.log(e)
  }

  return (
    <div>
      <textarea
        data-testid="text-box-textarea"
        onKeyDown={handleInput}
        onClick={handleClick}
        rows={10}
        value={text}
      />
      {howToShowPreEditText === OFF_THE_SPOT && (
        <div
          data-testid="pre-edit-text-off-the-spot"
          className="pre-edit-text-off-the-spot"
        >
          {(preEditText.composed + preEditText.composing).length > 0 ? preEditText.composed + preEditText.composing : (<>&nbsp;</>)}
        </div>
      )}
    </div>
  )
}

export default TextBox
