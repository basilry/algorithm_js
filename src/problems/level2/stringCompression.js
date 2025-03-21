/**
 * 문자열 압축 (문자열 처리 - 레벨 2)
 * 반복되는 문자를 숫자+문자 형태로 압축하는 함수
 *
 * @param {string} str - 압축할 문자열
 * @returns {string} - 압축된 문자열
 */
function compressString(str) {
    if (!str || str.length === 0) return ""
    if (str.length === 1) return str

    let compressed = ""
    let currentChar = str[0]
    let count = 1

    // 문자열 순회하며 압축
    for (let i = 1; i <= str.length; i++) {
        // 현재 문자가 이전 문자와 같으면 카운트 증가
        if (i < str.length && str[i] === currentChar) {
            count++
        }
        // 다른 문자를 만났거나 문자열 끝에 도달한 경우
        else {
            // 1번만 등장한 문자는 숫자 생략
            compressed += count === 1 ? currentChar : currentChar + count

            // 다음 문자로 초기화
            if (i < str.length) {
                currentChar = str[i]
                count = 1
            }
        }
    }

    // 압축 결과가 원본보다 길면 원본 반환
    return compressed.length < str.length ? compressed : str
}

module.exports = compressString
