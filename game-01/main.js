function findSubsetSum(M, N) {
    const complements = new Set();

    for (const num of M) {
        const complement = N - num;
        if (complements.has(complement)) {
            return [complement, num];
        }
        complements.add(num);
    }

    return [];
}


if (require.main === module) {
    const M = [2, 5, 8, 14, 0];
    const N = 16;
    const result = findSubsetSum(M, N);
    console.log(result);
}