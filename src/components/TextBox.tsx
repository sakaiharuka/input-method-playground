import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import getCaretCoordinates from 'textarea-caret'

import { RootState } from '../app/store'
import { OFF_THE_SPOT, OVER_THE_SPOT } from '../features/settingsSlice'
import { useInputMethod } from '../hooks/useInputMethod'
import './TextBox.css'

type CaretPos = {
  top: number,
  left: number
}

const TextBox: React.FC = () => {
  const howToShowPreEditText = useSelector((state: RootState) => state.settings.howToShowPreEditText)
  const {
    preEditText,
    candidates,
    showCandidates,
    selectedCandidate,
    finalText,
    handleInput: handleIME
  } = useInputMethod()

  const [text, setText] = useState('')
  const [selectionStart, setSelectionStart] = useState(0)
  const [selectionEnd, setSelectionEnd] = useState(0)

  const [caretPos, setCaretPos] = useState<CaretPos>({
    top: 0,
    left: 0
  })

  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    // textareaをcontrolled componentにすると　setSelectionRangeが効かない？
    if (textAreaRef.current) {
      const caretPos = selectionStart + finalText.length
      textAreaRef.current.value = text.slice(0, selectionStart) + finalText + text.slice(selectionEnd)
      textAreaRef.current.setSelectionRange(caretPos, caretPos)
      setText(text.slice(0, selectionStart) + finalText + text.slice(selectionEnd))
    }
  }, [finalText])

  const handleInput: React.KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    const caretPos = getCaretCoordinates(e.currentTarget, e.currentTarget.selectionStart)
    setCaretPos(caretPos)
    console.log(caretPos)

    if (!e.altKey && !e.ctrlKey && !e.metaKey && !e.shiftKey) {
      switch (e.key) {
        case 'Backspace':
          break
        default:
          e.preventDefault()
          setSelectionStart(e.currentTarget.selectionStart)
          setSelectionEnd(e.currentTarget.selectionEnd)
          handleIME(e)
          break
      }
    }
  }

  const handleClick: React.MouseEventHandler<HTMLTextAreaElement> = (e) => {
    setSelectionStart(e.currentTarget.selectionStart)
    setSelectionEnd(e.currentTarget.selectionEnd)
  }

  return (
    <div className="TextBox">
      <div style={{ position: 'absolute' }}>
        <textarea
          data-testid="text-box-textarea"
          onKeyDown={handleInput}
          onClick={handleClick}
          rows={10}
          ref={textAreaRef}
        />
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
        {showCandidates && (
          <div style={{ position: 'static' }}>
            <ul>
              {candidates.map((candidate, i) => {
                return <li key={i} className={i === selectedCandidate ? 'selected-candidate' : ''}>{candidate}</li>
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default TextBox
