import { useState } from "react"

import { searchKey, romanTable } from '../lib/roman'
import { kanaKanji } from '../lib/kanaKanji'

type PreEditText = {
  composed: string
  composing: string
}

export const useInputMethod = () => {
  const [preEditText, setPreEditText] = useState<PreEditText>({
    composed: '',
    composing: ''
  })

  const [candidates, setCandidates] = useState<string[]>([])
  const [showCandidates, setShowCandidates] = useState(false)
  const [selectedCandidate, setSelectedCandidate] = useState(0)

  const [finalText, setFinalText] = useState('')

  const clearFinalText = () => {
    setFinalText('')
  }

  const handleInput: React.KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    setFinalText('')
    if (!showCandidates) {
      switch (e.code) {
        case 'Enter':
          const inputText = preEditText.composed + preEditText.composing
          setFinalText(inputText)
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
            setFinalText('　')
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
          setFinalText(candidates[selectedCandidate])
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

  return {
    preEditText,
    candidates,
    showCandidates,
    selectedCandidate,
    finalText,
    clearFinalText,
    handleInput
  }
}
