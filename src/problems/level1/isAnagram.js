/**
 * 두 문자열의 아나그램 확인 문제 (자료구조 활용 - 레벨 1)
 * 두 문자열이 서로 아나그램인지 확인하는 함수
 * 아나그램은 문자의 순서를 바꾸어 다른 의미를 가진 단어로 재구성한 것
 *
 * @param {string} s - 첫 번째 문자열
 * @param {string} t - 두 번째 문자열
 * @returns {boolean} - 두 문자열이 아나그램인지 여부
 */
function isAnagram(s, t) {
    // 공백을 제거
    const cleanS = s.replace(/\s/g, "")
    const cleanT = t.replace(/\s/g, "")

    // 길이가 다르면 아나그램이 될 수 없음
    if (cleanS.length !== cleanT.length) {
        return false
    }

    // 문자 빈도수를 저장할 해시맵
    const charCount = {}

    // 첫 번째 문자열의 각 문자 빈도수 계산
    for (let i = 0; i < cleanS.length; i++) {
        const char = cleanS[i]
        charCount[char] = (charCount[char] || 0) + 1
    }

    // 두 번째 문자열의 각 문자로 빈도수 감소
    for (let i = 0; i < cleanT.length; i++) {
        const char = cleanT[i]

        // 해당 문자가 없거나 빈도수가 0이면 아나그램이 아님
        if (!charCount[char]) {
            return false
        }

        charCount[char]--
    }

    // 모든 문자의 빈도수가 0이어야 함
    for (const char in charCount) {
        if (charCount[char] !== 0) {
            return false
        }
    }

    return true
}

/**
 * 정렬을 사용한 아나그램 확인 함수 (더 간단하지만 덜 효율적)
 *
 * @param {string} s - 첫 번째 문자열
 * @param {string} t - 두 번째 문자열
 * @returns {boolean} - 두 문자열이 아나그램인지 여부
 */
function isAnagramSorting(s, t) {
    // 공백 제거
    const cleanS = s.replace(/\s/g, "")
    const cleanT = t.replace(/\s/g, "")

    // 길이가 다르면 아나그램이 될 수 없음
    if (cleanS.length !== cleanT.length) {
        return false
    }

    // 문자열을 배열로 변환하고 정렬한 후 다시 문자열로 변환
    const sortedS = cleanS.split("").sort().join("")
    const sortedT = cleanT.split("").sort().join("")

    // 정렬된 문자열이 같으면 아나그램
    return sortedS === sortedT
}

module.exports = {
    isAnagram,
    isAnagramSorting,
}
