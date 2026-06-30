import test, { describe } from "node:test"
import assert from "node:assert"

// Inline the encoder function from search.inline.ts for testing
const encoder = (str: string): string[] => {
  const tokens: string[] = []
  let bufferStart = -1
  let bufferEnd = -1
  const lower = str.toLowerCase()

  let i = 0
  for (const char of lower) {
    const code = char.codePointAt(0)!

    const isCJK =
      (code >= 0x3040 && code <= 0x309f) ||
      (code >= 0x30a0 && code <= 0x30ff) ||
      (code >= 0x4e00 && code <= 0x9fff) ||
      (code >= 0xac00 && code <= 0xd7af) ||
      (code >= 0x20000 && code <= 0x2a6df)

    const isWhitespace = code === 32 || code === 9 || code === 10 || code === 13

    if (isCJK) {
      if (bufferStart !== -1) {
        tokens.push(lower.slice(bufferStart, bufferEnd))
        bufferStart = -1
      }
      tokens.push(char)
    } else if (isWhitespace) {
      if (bufferStart !== -1) {
        tokens.push(lower.slice(bufferStart, bufferEnd))
        bufferStart = -1
      }
    } else {
      if (bufferStart === -1) bufferStart = i
      bufferEnd = i + char.length
    }

    i += char.length
  }

  if (bufferStart !== -1) {
    tokens.push(lower.slice(bufferStart))
  }

  return tokens
}

describe("search encoder", () => {
  describe("English text", () => {
    test("should tokenize simple English words", () => {
      const result = encoder("hello world")
      assert.deepStrictEqual(result, ["hello", "world"])
    })

    test("should handle multiple spaces", () => {
      const result = encoder("hello   world")
      assert.deepStrictEqual(result, ["hello", "world"])
    })

    test("should handle tabs and newlines", () => {
      const result = encoder("hello\tworld\ntest")
      assert.deepStrictEqual(result, ["hello", "world", "test"])
    })

    test("should lowercase all text", () => {
      const result = encoder("Hello WORLD Test")
      assert.deepStrictEqual(result, ["hello", "world", "test"])
    })
  })

  describe("CJK text", () => {
    test("should tokenize Japanese Hiragana character by character", () => {
      const result = encoder("こんにちは")
      assert.deepStrictEqual(result, ["こ", "ん", "に", "ち", "は"])
    })

    test("should tokenize Japanese Katakana character by character", () => {
      const result = encoder("コントロール")
      assert.deepStrictEqual(result, ["コ", "ン", "ト", "ロ", "ー", "ル"])
    })

    test("should tokenize Japanese Kanji character by character", () => {
      const result = encoder("日本語")
      assert.deepStrictEqual(result, ["日", "本", "語"])
    })

    test("should tokenize Korean Hangul character by character", () => {
      const result = encoder("안녕하세요")
      assert.deepStrictEqual(result, ["안", "녕", "하", "세", "요"])
    })

    test("should tokenize Chinese characters character by character", () => {
      const result = encoder("你好世界")
      assert.deepStrictEqual(result, ["你", "好", "世", "界"])
    })

    test("should handle mixed Hiragana/Katakana/Kanji", () => {
      const result = encoder("て以来")
      assert.deepStrictEqual(result, ["て", "以", "来"])
    })
  })

  describe("Mixed CJK and English", () => {
    test("should handle Japanese with English words", () => {
      const result = encoder("hello 世界")
      assert.deepStrictEqual(result, ["hello", "世", "界"])
    })

    test("should handle English with Japanese words", () => {
      const result = encoder("世界 hello world")
      assert.deepStrictEqual(result, ["世", "界", "hello", "world"])
    })

    test("should handle complex mixed content", () => {
      const result = encoder("これはtest文章です")
      assert.deepStrictEqual(result, ["こ", "れ", "は", "test", "文", "章", "で", "す"])
    })

    test("should handle mixed Korean and English", () => {
      const result = encoder("hello 안녕 world")
      assert.deepStrictEqual(result, ["hello", "안", "녕", "world"])
    })

    test("should handle mixed Chinese and English", () => {
      const result = encoder("你好 world")
      assert.deepStrictEqual(result, ["你", "好", "world"])
    })
  })

  describe("Edge cases", () => {
    test("should handle empty string", () => {
      const result = encoder("")
      assert.deepStrictEqual(result, [])
    })

    test("should handle only whitespace", () => {
      const result = encoder("   \t\n  ")
      assert.deepStrictEqual(result, [])
    })

    test("should handle single character", () => {
      const result = encoder("a")
      assert.deepStrictEqual(result, ["a"])
    })

    test("should handle single CJK character", () => {
      const result = encoder("あ")
      assert.deepStrictEqual(result, ["あ"])
    })

    test("should handle CJK with trailing whitespace", () => {
      const result = encoder("日本語  ")
      assert.deepStrictEqual(result, ["日", "本", "語"])
    })

    test("should handle English with trailing whitespace", () => {
      const result = encoder("hello  ")
      assert.deepStrictEqual(result, ["hello"])
    })
  })
})
