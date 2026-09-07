
function mostFrequentStringLengths(arr) {
  if (!Array.isArray(arr) || arr.length === 0) return [];

  const counts = {};
  arr.forEach((s) => {
    counts[s.length] = (counts[s.length] || 0) + 1;
  });

  const maxCount = Math.max(...Object.values(counts));

  const targetLengths = new Set(
    Object.keys(counts)
      .filter((k) => counts[k] === maxCount)
      .map(Number)
  );

  return arr.filter((s) => targetLengths.has(s.length));
}

function runTests() {
  const assert = require('assert');

  const tests = [
    {
      name: 'Example from spec',
      input: ['a', 'ab', 'abc', 'cd', 'def', 'gh'],
      expected: ['ab', 'cd', 'gh'],
    },
    {
      name: 'All same length',
      input: ['a', 'b', 'c'],
      expected: ['a', 'b', 'c'],
    },
    {
      name: 'Empty array',
      input: [],
      expected: [],
    },
    {
      name: 'Two lengths, one wins clearly',
      input: ['aa', 'bb', 'cc', 'd'],
      expected: ['aa', 'bb', 'cc'],
    },
    {
      name: 'Longer length appears more often',
      input: ['hello', 'world', 'hi'],
      expected: ['hello', 'world'], 
    },
    {
      name: 'Single string',
      input: ['only'],
      expected: ['only'],
    },
    {
      name: 'Includes empty string',
      input: ['', 'a', 'bc', 'de', 'fg'],
      expected: ['bc', 'de', 'fg'], 
    },
    {
      name: 'Longer strings win',
      input: ['x', 'yy', 'zzz', 'ww'],
      expected: ['yy', 'ww'],
    },
  ];

  let passed = 0;
  tests.forEach(({ name, input, expected }, i) => {
    try {
      const result = mostFrequentStringLengths(input);
      assert.deepStrictEqual(result, expected, `Test #${i + 1} (${name}) failed`);
      console.log(`  PASS Test #${i + 1}: ${name}`);
      passed++;
    } catch (err) {
      console.log(`  FAIL Test #${i + 1}: ${name}`);
      console.log(`    Expected: ${JSON.stringify(expected)}`);
      console.log(`    Got:      ${JSON.stringify(err.actual)}`);
    }
  });

  console.log(`\nTask 1: ${passed}/${tests.length} tests passed`);
  return passed === tests.length;
}

if (require.main === module) {
  runTests();
}

module.exports = { mostFrequentStringLengths };
