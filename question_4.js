/**
 * Bob's Sign Pricing Problem
 *
 * Overview:
 * You need to help Bob be a good businessman and not charge people too much for his signs.
 *
 * Description:
 * Bob is running a business that creates signs for people. He can charge much less than his
 * competitors because he charges by letter instead by the entire sign. He can take a sign and
 * change a few letters to make a new sign much more cheaply than a competitor can make a sign from scratch.
 *
 * The only problem is Bob is not very good at pricing these changes. He wants to be able to
 * look at a sign and a customer's request and quickly be able to give the customer an estimate
 * for the total cost.
 *
 * Task:
 * Define a function estimate(add_cost, remove_cost, old_sign, new_sign) -> minimum_cost that
 * is adaptable to changes in the market, and can help Bob estimate prices quickly.
 *
 * The first 2 arguments are the costs of doing an operation, of adding and removing a letter respectively.
 * The last 2 arguments are the old sign of the customer, and their request.
 *
 * It should return the cost of changing the sign from the old message to the new message.
 * If there are multiple ways to change the sign, it should return the cheapest way.
 */

function estimate(addCost, removeCost, oldSign, newSign) {
  const m = oldSign.length;
  const n = newSign.length;

  // Create DP table
  const dp = Array(m + 1)
    .fill()
    .map(() => Array(n + 1).fill(0));

  // Base cases
  for (let i = 0; i <= m; i++) {
    dp[i][0] = i * removeCost; // Remove all characters from old sign
  }

  for (let j = 0; j <= n; j++) {
    dp[0][j] = j * addCost; // Add all characters to new sign
  }

  // Fill DP table
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (oldSign[i - 1] === newSign[j - 1]) {
        // Characters match, no cost
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        // Take minimum of remove, add, or replace
        const remove = dp[i - 1][j] + removeCost;
        const add = dp[i][j - 1] + addCost;
        dp[i][j] = Math.min(remove, add);
      }
    }
  }

  return dp[m][n];
}

console.log(estimate(1, 1, "hello", "world")); // Expected: 8 (5 removals + 5 additions):10-2 duplicate
console.log(estimate(1, 1, "hello", "hello")); // Expected: 0 (no changes needed)
console.log(estimate(1, 1, "", "hello")); // Expected: 5 (add 5 chars)
console.log(estimate(1, 1, "hello", "")); // Expected: 5 (remove 5 chars)
console.log(estimate(3, 2, "abc", "def")); // Expected: 15 (remove 3 chars * 2, add 3 chars * 3)
