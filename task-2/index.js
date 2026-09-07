
function sumOfTopTwo(arr) {
  if (!Array.isArray(arr) || arr.length < 2) {
    throw new Error('Array must contain at least 2 numbers.');
  }

  let max1 = -Infinity;
  let max2 = -Infinity;

  for (const num of arr) {
    if (typeof num !== 'number' || Number.isNaN(num)) {
      throw new Error('All elements must be valid numbers.');
    }
    if (num > max1) {
      max2 = max1;
      max1 = num;
    } else if (num > max2) {
      max2 = num;
    }
  }

  return max1 + max2;
}

function runTests() {
  const assert = require('assert');

  const tests = [
    {
      name: 'Example from spec',
      input: [1, 4, 2, 3, 5],
      expected: 9,
    },
    {
      name: 'Exactly two elements',
      input: [10, 20],
      expected: 30,
    },
    {
      name: 'Negative numbers',
      input: [-1, -5, -2, -8],
      expected: -3, 
    },
    {
      name: 'Mixed positive and negative',
      input: [-10, 5, 3, 8, 2],
      expected: 13, 
    },
    {
      name: 'Duplicates of the max',
      input: [5, 5, 5, 1],
      expected: 10, 
    },
    {
      name: 'Sorted descending',
      input: [100, 50, 30, 20, 10],
      expected: 150,
    },
    {
      name: 'Sorted ascending',
      input: [1, 2, 3, 4, 5],
      expected: 9,
    },
    {
      name: 'Only two largest in middle',
      input: [1, 2, 100, 3, 99, 4],
      expected: 199,
    },
    {
      name: 'Zeroes included',
      input: [0, 0, 1, 2],
      expected: 3,
    },
  ];

  const errorTests = [
    {
      name: 'Empty array throws',
      input: [],
      expectError: true,
    },
    {
      name: 'Single element throws',
      input: [42],
      expectError: true,
    },
    {
      name: 'Non-array throws',
      input: 'not an array',
      expectError: true,
    },
  ];

  let passed = 0;

  tests.forEach(({ name, input, expected }, i) => {
    try {
      const result = sumOfTopTwo(input);
      assert.strictEqual(result, expected, `Test #${i + 1} (${name}) failed`);
      console.log(`  PASS Test #${i + 1}: ${name}`);
      passed++;
    } catch (err) {
      console.log(`  ✗ Test #${i + 1}: ${name}`);
      console.log(`    ${err.message}`);
    }
  });

  errorTests.forEach(({ name, input, expectError }, i) => {
    const idx = tests.length + i + 1;
    try {
      sumOfTopTwo(input);
      if (expectError) throw new Error('Expected function to throw');
      console.log(`  ✓ Test #${idx}: ${name}`);
      passed++;
    } catch (err) {
      if (expectError) {
      console.log(`  PASS Test #${idx}: ${name}`);
        passed++;
      } else {
        console.log(`  FAIL Test #${idx}: ${name}`);
        console.log(`    ${err.message}`);
      }
    }
  });

  console.log(`\nTask 2: ${passed}/${tests.length + errorTests.length} tests passed`);
  return passed === tests.length + errorTests.length;
}

if (require.main === module) {
  runTests();
}

module.exports = { sumOfTopTwo };
