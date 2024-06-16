import toCents from "../javascripts/utils/money.js";

console.log('test suite: formatCurrency');

console.log('convert cents into dollar');
if (toCents(2095) === '20.95') { // Basic test cases
  console.log('passed');
} else {
  console.log('failed');
}

console.log('works with 0');
if (toCents(0) === '0.00') { // Edge test cases
  console.log('passed');
} else {
  console.log('failed');
}

console.log('round up to the nearest cent');
if (toCents(2000.5) === '20.01') { // Edge test cases
  console.log('passed'); 
} else {
  console.log('failed');
}

console.log('round up to the nearest cent');
if (toCents(2000.4) === '20.00') { // Edge test cases
  console.log('passed'); 
} else {
  console.log('failed');
}