import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import { searchKey, romanTable } from '../lib/roman'
import { kanaKanji } from '../lib/kanaKanji'
import { RootState } from '../app/store'
import { OFF_THE_SPOT} from '../features/settingsSlice'

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

  const [showCandidates, setShowCandidates] = useState(false)
  const [candidates, setCandidates] = useState<string[]>([])
  const [selectedCandidate, setSelectedCandidate] = useState(0)

  const handleInput: React.KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    const selectionStart = e.currentTarget.selectionStart
    const selectionEnd = e.currentTarget.selectionEnd
    if (!showCandidates) {
      if (!e.altKey && !e.ctrlKey && !e.metaKey && !e.shiftKey) {
        switch (e.code) {
          case 'Enter':
            const inputText = preEditText.composed + preEditText.composing
            setText(text.slice(0, selectionStart) + inputText + text.slice(selectionEnd))
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
            const kana = `${preEditText.composed}${preEditText.composing}`
            if (kana.length > 0) {
              e.preventDefault()
              const candidates = kanaKanji(kana)
              if (candidates.length > 0) {
                setShowCandidates(true)
                setCandidates(candidates)
                setSelectedCandidate(0)
              }
            } else {
              setText(`${text}　`)
            }
            break
          default:
            e.preventDefault()
            const roman = preEditText.composing + e.key
            const romanKey = searchKey(roman)
            if (romanKey.length > 0) {
              setPreEditText({
                composed: preEditText.composed + roman.slice(0, roman.length - romanKey.length) + romanTable[romanKey][0],
                composing: romanTable[romanKey][1]
              })
            } else {
              setPreEditText({
                composed: preEditText.composed,
                composing: roman
              })
            }
        }
      }
    } else {
      switch (e.code) {
        case 'Space':
          if (selectedCandidate === candidates.length - 1) {
            setSelectedCandidate(0)
          } else {
            setSelectedCandidate(selectedCandidate + 1)
          }
          break
        case 'Enter':
          setText(text + candidates[selectedCandidate])
          setPreEditText({
            composed: '',
            composing: ''
          })
          setShowCandidates(false)
          setCandidates([])
          break
      }
    }
  }

  const handleClick: React.MouseEventHandler = (e) => {
    console.log(e)
  }

  return (
    <div className="TextBox">
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
      {showCandidates && (
        <div>
          <ul>
            {candidates.map((candidate, i) => {
              return <li key={i} className={i === selectedCandidate ? 'selected-candidate' : ''}>{candidate}</li>
            })}
          </ul>
        </div>
      )}
    </div>
  )
}

export default TextBox
