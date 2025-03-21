/**
 * 단어 변환 (그래프 탐색 - 레벨 2)
 * 주어진 시작 단어에서 목표 단어로 변환하는 최소 단계 수 구하기
 * 한 번에 한 글자만 변경 가능하며, 변경된 단어는 단어 목록에 존재해야 함
 *
 * @param {string} beginWord - 시작 단어
 * @param {string} endWord - 목표 단어
 * @param {string[]} wordList - 사용 가능한 단어 목록
 * @returns {number} - 최소 변환 단계 수, 불가능하면 0 반환
 */
function wordTransform(beginWord, endWord, wordList) {
    // 목표 단어가 단어 목록에 없는 경우
    if (!wordList.includes(endWord)) return 0

    // 방문 여부를 체크하기 위한 Set
    const visited = new Set()

    // BFS를 위한 큐
    const queue = [[beginWord, 1]] // [단어, 단계]

    while (queue.length > 0) {
        const [currentWord, level] = queue.shift()

        // 목표 단어에 도달한 경우
        if (currentWord === endWord) {
            return level
        }

        // 현재 단어와 한 글자만 다른 단어 찾기
        for (const word of wordList) {
            if (!visited.has(word) && isOneCharDifferent(currentWord, word)) {
                visited.add(word)
                queue.push([word, level + 1])
            }
        }
    }

    // 변환할 수 없는 경우
    return 0
}

/**
 * 두 단어가 한 글자만 다른지 확인하는 헬퍼 함수
 *
 * @param {string} word1 - 첫 번째 단어
 * @param {string} word2 - 두 번째 단어
 * @returns {boolean} - 한 글자만 다르면 true, 아니면 false
 */
function isOneCharDifferent(word1, word2) {
    // 길이가 다르면 false
    if (word1.length !== word2.length) return false

    let differenceCount = 0

    for (let i = 0; i < word1.length; i++) {
        if (word1[i] !== word2[i]) {
            differenceCount++
        }
        if (differenceCount > 1) return false
    }

    return differenceCount === 1
}

module.exports = wordTransform
