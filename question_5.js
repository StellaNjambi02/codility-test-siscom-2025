// Crown Jewels Bribery Problem
// You need to find the minimum worst-case cost to locate jewels in rooms
// Each guard tells you if jewels are in higher/lower numbered rooms
// You pay different bribes for each guard

function leastBribes(bribes) {
  const n = bribes.length;

  // Handle edge cases
  if (n === 0) return 0;
  if (n === 1) return bribes[0];
  if (n === 2) return Math.min(bribes[0], bribes[1]);

  // Create DP table: dp[i][j] = min cost for rooms i to j
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
        let cost = bribes[k];

        // Add cost for remaining rooms in worst case
        if (k > i) {
          cost += dp[i][k - 1];
        }
        if (k < j) {
          cost += dp[k + 1][j];
        }

        minCost = Math.min(minCost, cost);
      }

      dp[i][j] = minCost;
    }
  }

  return dp[0][n - 1];
}

// Test the solution
console.log("Test 1:", leastBribes([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])); // Expected: 26
console.log("Test 2:", leastBribes([1, 2, 3])); // Expected: 2
console.log("Test 3:", leastBribes([5, 5, 5, 5, 5])); // Expected: 15
console.log("Test 4:", leastBribes([10, 1, 10])); // Expected: 11
console.log("Test 5:", leastBribes([1])); // Expected: 1
console.log("Test 6:", leastBribes([1, 2])); // Expected: 1
