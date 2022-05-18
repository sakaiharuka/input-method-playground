import React, { useState } from 'react'

import './TextBox.css'

const romanTable: { [key: string]: string[] } = {
  'a': ['あ', 'ア'], 'i': ['い', 'イ'], 'u': ['う', 'ウ'], 'e': ['え', 'エ'], 'o': ['お', 'オ'],
  'xa': ['ぁ', 'ァ'], 'xi': ['ぃ', 'ィ'], 'xu': ['ぅ', 'ゥ'], 'xe': ['ぇ', 'ェ'], 'xo': ['ぉ', 'ォ'],
  'ka': ['か', 'カ'], 'ki': ['き', 'キ'], 'ku': ['く', 'ク'], 'ke': ['け', 'ケ'], 'ko': ['こ', 'コ'],
  'ga': ['が', 'ガ'], 'gi': ['ぎ', 'ギ'], 'gu': ['ぐ', 'グ'], 'ge': ['げ', 'ゲ'], 'go': ['ご', 'ゴ'],
  'sa': ['さ', 'サ'], 'si': ['し', 'シ'], 'su': ['す', 'ス'], 'se': ['せ', 'セ'], 'so': ['そ', 'ソ'],
  'za': ['ざ', 'ザ'], 'zi': ['じ', 'ジ'], 'zu': ['ず', 'ズ'], 'ze': ['ぜ', 'ゼ'], 'zo': ['ぞ', 'ゾ'],
  'ta': ['た', 'タ'], 'ti': ['ち', 'チ'], 'tu': ['つ', 'ツ'], 'te': ['て', 'テ'], 'to': ['と', 'ト'],
  'da': ['だ', 'ダ'], 'di': ['ぢ', 'ヂ'], 'du': ['づ', 'ヅ'], 'de': ['で', 'デ'], 'do': ['ど', 'ド'],
  'na': ['な', 'ナ'], 'ni': ['に', 'ニ'], 'nu': ['ぬ', 'ヌ'], 'ne': ['ね', 'ネ'], 'no': ['の', 'ノ'],
  'ha': ['は', 'ハ'], 'hi': ['ひ', 'ヒ'], 'hu': ['ふ', 'フ'], 'he': ['へ', 'ヘ'], 'ho': ['ほ', 'ホ'],
  'ba': ['ば', 'バ'], 'bi': ['び', 'ビ'], 'bu': ['ぶ', 'ブ'], 'be': ['べ', 'ベ'], 'bo': ['ぼ', 'ボ'],
  'pa': ['ぱ', 'パ'], 'pi': ['ぴ', 'ピ'], 'pu': ['ぷ', 'プ'], 'pe': ['ぺ', 'ペ'], 'po': ['ぽ', 'ポ'],
  'ma': ['ま', 'マ'], 'mi': ['み', 'ミ'], 'mu': ['む', 'ム'], 'me': ['め', 'メ'], 'mo': ['も', 'モ'],
  'ya': ['や', 'ヤ'], 'yu': ['ゆ', 'ユ'], 'yo': ['よ', 'ヨ'],
  'xya': ['ゃ', 'ャ'], 'xyu': ['ゅ', 'ュ'], 'xyo': ['ょ', 'ョ'],
  'ra': ['ら', 'ラ'], 'ri': ['り', 'リ'], 'ru': ['る', 'ル'], 're': ['れ', 'レ'], 'ro': ['ろ', 'ロ'],
  'wa': ['わ', 'ワ'], 'wo': ['を', 'ヲ'],
  'nn': ['ん', 'ン'],
  'kya': ['きゃ', 'キャ'], 'kyu': ['きゅ', 'キュ'], 'kyo': ['きょ', 'キョ'],
  'gya': ['ぎゃ', 'ギャ'], 'gyu': ['ぎゅ', 'ギュ'], 'gyo': ['ぎょ', 'ギョ'],
  'sha': ['しゃ', 'シャ'], 'shi': ['し', 'シ'], 'shu': ['しゅ', 'シュ'], 'she': ['しぇ', 'シェ'], 'sho': ['しょ', 'ショ'],
  'sya': ['しゃ', 'シャ'], 'syu': ['しゅ', 'シュ'], 'syo': ['しょ', 'ショ'],
  'ja': ['じゃ', 'ジャ'], 'ji': ['じ', 'ジ'], 'ju': ['じゅ', 'ジュ'], 'je': ['じぇ', 'ジェ'], 'jo': ['じょ', 'ジョ'],
  'zya': ['じゃ', 'ジャ'], 'zyu': ['じゅ', 'ジュ'], 'zyo': ['じょ', 'ジョ'],
  'cha': ['ちゃ', 'チャ'], 'chi': ['ち', 'チ'], 'chu': ['ちゅ', 'チュ'], 'che': ['ちぇ', 'チェ'], 'cho': ['ちょ', 'チョ'],
  'tya': ['ちゃ', 'チャ'], 'tyu': ['ちゅ', 'チュ'], 'tyo': ['ちょ', 'チョ'],
  'nya': ['にゃ', 'ニャ'], 'nyu': ['にゅ', 'ニュ'], 'nyo': ['にょ', 'ニョ'],
  'fa': ['ふぁ', 'ファ'], 'fi': ['ふぃ', 'フィ'], 'fu': ['ふ', 'フ'], 'fe': ['ふぇ', 'フェ'], 'fo': ['ふぉ', 'フォ'],
  'hya': ['ひゃ', 'ヒャ'], 'hyu': ['ひゅ', 'ヒュ'], 'hyo': ['ひょ', 'ヒョ'],
  'bya': ['びゃ', 'ビャ'], 'byu': ['びゅ', 'ビュ'], 'byo': ['びょ', 'ビョ'],
  'mya': ['みゃ', 'ミャ'], 'myu': ['みゅ', 'ミュ'], 'myo': ['みょ', 'ミョ'],
  'rya': ['りゃ', 'リャ'], 'ryu': ['りゅ', 'リュ'], 'ryo': ['りょ', 'リョ'],
  '-': ['ー', 'ー'],
  ',': ['、', '、'], '.': ['。', '。'],
  '[': ['「', '「'], ']': ['」', '」'], '(': ['（', '（'], ')': ['）', '）'],
  '?': ['？', '？'], '!': ['！', '！'],
  'z/': ['・', '・']
}

const TextBox: React.FC = () => {
  const [text, setText] = useState('')
  const [preEditText, setPreEditText] = useState('')


  const searchKey = (roman: string): string => {
    if (roman.length > 0) {
      if (Object.keys(romanTable).includes(roman)) {
        return roman
      }
      return searchKey(roman.slice(1,))
    }
    return ''
  }

  const handleInput: React.KeyboardEventHandler = (e) => {
    if (!e.altKey && !e.ctrlKey && !e.metaKey && !e.shiftKey) {
      switch (e.code) {
        case 'Enter':
          break
        case 'Backspace':
          if (preEditText.length > 0) {
            setPreEditText(preEditText.slice(0, -1))
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
          const roman = preEditText + e.key
          const romanKey = searchKey(roman)
          if (romanKey.length > 0) {
            setText(text + roman.slice(0, roman.length - romanKey.length) + romanTable[romanKey][0])
            setPreEditText('')
          } else {
            setPreEditText(preEditText + roman)
          }
      }
    }
  }

  const handleClick: React.MouseEventHandler = (e) => {
    console.log(e)
  }

  return (
    <div>
      <textarea onKeyDown={handleInput} onClick={handleClick} rows={10} value={text} />
    </div>
  )
}

export default TextBox
