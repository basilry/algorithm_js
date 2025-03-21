/**
 * 유효한 괄호 (문자열 처리/자료구조 활용 - 레벨 1)
 * 괄호 문자열이 유효한지 확인하는 함수
 *
 * @param {string} s - 괄호로 이루어진 문자열 (예: "()[]{}")
 * @returns {boolean} - 유효한 괄호면 true, 아니면 false
 */
function isValidParentheses(s) {
    // 빈 문자열인 경우 유효함
    if (s.length === 0) return true

    // 홀수 길이면 무조건 유효하지 않음
    if (s.length % 2 !== 0) return false

    const stack = []
    const pairs = {
        "(": ")",
        "{": "}",
        "[": "]",
    }

    for (const char of s) {
        // 여는 괄호인 경우 스택에 추가
        if (char in pairs) {
            stack.push(char)
        }
        // 닫는 괄호인 경우
        else {
            // 스택이 비어있거나 짝이 맞지 않는 경우
            const last = stack.pop()
            if (!last || pairs[last] !== char) {
                return false
            }
        }
    }

    // 모든 괄호가 짝이 맞아 스택이 비어있어야 유효함
    return stack.length === 0
}

module.exports = isValidParentheses
