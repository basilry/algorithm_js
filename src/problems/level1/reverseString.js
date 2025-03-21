/**
 * 문자열 뒤집기 (문자열 처리 - 레벨 1)
 * 주어진 문자열을 뒤집는 함수
 *
 * @param {string} str - 뒤집을 문자열
 * @returns {string} - 뒤집힌 문자열
 */
function reverseString(str) {
    // 방법 1: 내장 함수 사용
    //return str.split('').reverse().join('');

    // 방법 2: 반복문 사용
    let result = ""
    for (let i = str.length - 1; i >= 0; i--) {
        result += str[i]
    }
    return result
}

module.exports = reverseString
