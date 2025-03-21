/**
 * 문자열 배열을 알파벳 순으로 정렬
 * @param {string[]} arr - 정렬할 문자열 배열
 * @returns {string[]} 정렬된 배열
 */
function alphabeticalSort(arr) {
    return [...arr].sort()
}

/**
 * 문자열 배열을 길이 순으로 정렬
 * @param {string[]} arr - 정렬할 문자열 배열
 * @returns {string[]} 정렬된 배열
 */
function lengthSort(arr) {
    return [...arr].sort((a, b) => a.length - b.length)
}

/**
 * 문자열 내 특정 문자의 빈도수로 정렬
 * @param {string[]} arr - 정렬할 문자열 배열
 * @param {string} char - 빈도를 계산할 문자
 * @returns {string[]} 정렬된 배열
 */
function frequencySort(arr, char) {
    return [...arr].sort((a, b) => {
        const countA = (a.match(new RegExp(char, "g")) || []).length
        const countB = (b.match(new RegExp(char, "g")) || []).length
        return countB - countA // 빈도 높은 순
    })
}

module.exports = {
    alphabeticalSort,
    lengthSort,
    frequencySort,
}
