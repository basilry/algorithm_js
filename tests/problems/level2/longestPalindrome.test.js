const longestPalindrome = require("../../../src/problems/level2/longestPalindrome")

describe("가장 긴 팰린드롬 부분 문자열 문제", () => {
    test('예제 1: "babad" -> "bab" 또는 "aba"', () => {
        const result = longestPalindrome("babad")
        // 두 가지 답이 가능하므로 둘 다 확인
        expect(["bab", "aba"].includes(result)).toBe(true)
    })

    test('예제 2: "cbbd" -> "bb"', () => {
        expect(longestPalindrome("cbbd")).toBe("bb")
    })

    test("예제 3: 문자 하나는 그 자체로 팰린드롬", () => {
        expect(longestPalindrome("a")).toBe("a")
    })

    test("예제 4: 빈 문자열은 빈 문자열 반환", () => {
        expect(longestPalindrome("")).toBe("")
    })

    test("예제 5: 모든 문자가 같은 경우 문자열 전체가 팰린드롬", () => {
        expect(longestPalindrome("aaaaa")).toBe("aaaaa")
    })

    test("예제 6: 짝수 길이 팰린드롬", () => {
        expect(longestPalindrome("abccba")).toBe("abccba")
    })

    test("예제 7: 홀수 길이 팰린드롬", () => {
        expect(longestPalindrome("racecar")).toBe("racecar")
    })
})
