/**
 * Longest Palindromic Substring
 *
 * Given a string s, return the longest palindromic substring in s.
 *
 * Example 1:
 * Input: s = "babad"
 * Output: "bab"
 * Explanation: "aba" is also a valid answer.
 *
 * Example 2:
 * Input: s = "cbbd"
 * Output: "bb"
 *
 * Constraints:
 * 1 <= s.length <= 1000
 * s consist of only digits and English letters.
 */

function longestPalindrome(s) {
  if (s.length <= 1) {
    return s;
  }

  let start = 0;
  let maxLength = 1;

  // function to expand around center
  function expandAroundCenter(left, right) {
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      const currentLength = right - left + 1;
      if (currentLength > maxLength) {
        start = left;
        maxLength = currentLength;
      }
      left--;
      right++;
    }
  }

  // Check each character as potential center
  for (let i = 0; i < s.length; i++) {
    // (single character center)
    expandAroundCenter(i, i);

    // For even length palindromes(two character center)
    expandAroundCenter(i, i + 1);
  }

  return s.substring(start, start + maxLength);
}

console.log(longestPalindrome("babad")); //  "bab" or "aba"
console.log(longestPalindrome("cbbd")); //  "bb"
console.log(longestPalindrome("a")); //  "a"
console.log(longestPalindrome("racecar")); //  "racecar"
