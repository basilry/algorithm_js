/**
 * 가장 긴 팰린드롬 부분 문자열 (문자열 처리 - 레벨 2)
 * 주어진 문자열에서 가장 긴 팰린드롬 부분 문자열 찾기
 *
 * @param {string} s - 입력 문자열
 * @returns {string} - 가장 긴 팰린드롬 부분 문자열
 */
function longestPalindrome(s) {
    if (!s || s.length < 1) return ""
    if (s.length === 1) return s

    let start = 0
    let maxLength = 1 // 최소 길이는 1

    // 주어진 위치에서 양쪽으로 확장하며 팰린드롬 길이 확인
    function expandAroundCenter(left, right) {
        while (left >= 0 && right < s.length && s[left] === s[right]) {
            left--
            right++
        }

        // 팰린드롬 길이 반환 (left와 right는 팰린드롬이 깨진 위치)
        return right - left - 1
    }

    // 문자열의 각 위치를 중심으로 팰린드롬 확인
    for (let i = 0; i < s.length; i++) {
        // 홀수 길이 팰린드롬 (중심이 한 문자)
        const len1 = expandAroundCenter(i, i)

        // 짝수 길이 팰린드롬 (중심이 두 문자 사이)
        const len2 = expandAroundCenter(i, i + 1)

        // 더 긴 팰린드롬 길이
        const len = Math.max(len1, len2)

        // 더 긴 팰린드롬을 찾은 경우 갱신
        if (len > maxLength) {
            maxLength = len
            start = i - Math.floor((len - 1) / 2)
        }
    }

    return s.substring(start, start + maxLength)
}

module.exports = longestPalindrome
