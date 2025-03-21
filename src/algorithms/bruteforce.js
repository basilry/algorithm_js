/**
 * 모든 부분집합을 생성하는 함수 (완전탐색)
 * @param {Array} arr - 원본 배열
 * @returns {Array} 모든 부분집합을 포함한 배열
 */
function generateSubsets(arr) {
    const subsets = [[]]

    for (const item of arr) {
        const size = subsets.length
        for (let i = 0; i < size; i++) {
            subsets.push([...subsets[i], item])
        }
    }

    return subsets
}

/**
 * 모든 순열을 생성하는 함수 (완전탐색)
 * @param {Array} arr - 원본 배열
 * @returns {Array} 모든 순열을 포함한 배열
 */
function generatePermutations(arr) {
    const result = []

    function backtrack(current, remaining) {
        if (remaining.length === 0) {
            result.push([...current])
            return
        }

        for (let i = 0; i < remaining.length; i++) {
            const newRemaining = [...remaining]
            const picked = newRemaining.splice(i, 1)[0]
            current.push(picked)
            backtrack(current, newRemaining)
            current.pop()
        }
    }

    backtrack([], [...arr])
    return result
}

module.exports = {
    generateSubsets,
    generatePermutations,
}
