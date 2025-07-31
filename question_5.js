// Crown Jewels Bribery Problem
// This is a minimax problem - we want to minimize the maximum cost

function leastBribes(bribes) {
  const n = bribes.length;

  // Handle edge cases
  if (n === 0) return 0;
  if (n === 1) return bribes[0];
  if (n === 2) return Math.min(bribes[0], bribes[1]);

  // Create DP table: dp[i][j] = min worst-case cost for rooms i to j
  const dp = Array(n)
    .fill()
    .map(() => Array(n).fill(0));

  // Base cases: single room
  for (let i = 0; i < n; i++) {
    dp[i][i] = bribes[i];
  }

  // Base cases: two rooms
  for (let i = 0; i < n - 1; i++) {
    dp[i][i + 1] = Math.min(bribes[i], bribes[i + 1]);
  }

  // Fill DP table for larger ranges
  for (let len = 3; len <= n; len++) {
    for (let i = 0; i <= n - len; i++) {
      const j = i + len - 1;
      let minCost = Infinity;

      // Try each room as the first choice
      for (let k = i; k <= j; k++) {
        const currentCost = bribes[k];

        // Calculate worst case cost for remaining rooms
        let leftCost = 0;
        let rightCost = 0;

        if (k > i) {
          leftCost = dp[i][k - 1];
        }
        if (k < j) {
          rightCost = dp[k + 1][j];
        }

        // Worst case is the maximum of left and right paths
        const worstCase = currentCost + Math.max(leftCost, rightCost);
        minCost = Math.min(minCost, worstCase);
      }

      dp[i][j] = minCost;
    }
  }

  return dp[0][n - 1];
}

// Test the solution

console.log("Test 4:", leastBribes([10, 1, 10])); // Expected: 11
console.log("Test 5:", leastBribes([1])); // Expected: 1
console.log("Test 6:", leastBribes([1, 2])); // Expected: 1
