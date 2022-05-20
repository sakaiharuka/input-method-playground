type KanaKanjiDict = {
  [key:string]: string[]
}

const kanaKanjiDict: KanaKanjiDict = {
  'あお': ['青', '粟生', '阿保', '襖', '碧'],
  'あか': ['赤', '垢', '朱', '銅', '閼伽', '亜科', '丹', '淦', '絳', '赭']
}

export const kanaKanji = (kana: string): string[] => {
  const candidates = kanaKanjiDict[kana]
  if (candidates) {
    return candidates
  }
  return []
}
