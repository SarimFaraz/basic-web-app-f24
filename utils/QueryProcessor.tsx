export default function QueryProcessor(query: string): string {
  if (query.toLowerCase().includes("shakespeare")) {
    return (
      "William Shakespeare (26 April 1564 - 23 April 1616) was an " +
      "English poet, playwright, and actor, widely regarded as the greatest " +
      "writer in the English language and the world's pre-eminent dramatist."
    );
  }

  if (query.toLowerCase().includes("andrew id")) {
    //TODO update the corresponding test case in __tests__
    return "sfaraz";
  }

  if (query.includes("What is your name?")) {
    return "GitHub Copilot";
  }

  const additionRegex = /What is (\d+) plus (\d+)(?: plus (\d+))?\?/;
  const largestNumberRegex = /Which of the following numbers is the largest: ([\d, ]+)\?/;
  const squareCubeRegex = /Which of the following numbers is both a square and a cube: ([\d, ]+)\?/;
  const multiplicationRegex = /What is (\d+) multiplied by (\d+)\?/;
  const subtractionRegex = /What is (\d+) minus (\d+)\?/;
  const primeNumberRegex = /Which of the following numbers are primes: ([\d, ]+)\?/;
  const exponentiationRegex = /What is (\d+) to the power of (\d+)\?/;
  const complexMathRegex = /What is (\d+) plus (\d+) multiplied by (\d+)\?/;
  const complexMathWithMultiplicationRegex = /What is (\d+) multiplied by (\d+) plus (\d+)\?/;
  const scrabbleScoreRegex = /What is the scrabble score of (\w+)\?/;

  let match;

  // Handle complex math queries
  match = query.match(complexMathRegex);
  if (match) {
    const num1 = parseInt(match[1], 10);
    const num2 = parseInt(match[2], 10);
    const num3 = parseInt(match[3], 10);
    return (num1 + num2 * num3).toString();
  }

  // Handle addition queries
  match = query.match(additionRegex);
  if (match) {
    const num1 = parseInt(match[1], 10);
    const num2 = parseInt(match[2], 10);
    const num3 = match[3] ? parseInt(match[3], 10) : 0;
    return (num1 + num2 + num3).toString();
  }

  // Handle largest number queries
  match = query.match(largestNumberRegex);
  if (match) {
    const numbers = match[1].split(',').map(num => parseInt(num.trim(), 10));
    const largestNumber = Math.max(...numbers);
    return largestNumber.toString();
  }

  // Handle square and cube queries
  match = query.match(squareCubeRegex);
  if (match) {
    const numbers = match[1].split(',').map(num => parseInt(num.trim(), 10));
    const isSquareAndCube = (num: number) => {
      const sqrt = Math.sqrt(num);
      const cbrt = Math.cbrt(num);
      return Number.isInteger(sqrt) && Number.isInteger(cbrt);
    };
    const result = numbers.find(isSquareAndCube);
    return result !== undefined ? result.toString() : "None";
  }

  // Handle multiplication queries
  match = query.match(multiplicationRegex);
  if (match) {
    const num1 = parseInt(match[1], 10);
    const num2 = parseInt(match[2], 10);
    return (num1 * num2).toString();
  }

  // Handle subtraction queries
  match = query.match(subtractionRegex);
  if (match) {
    const num1 = parseInt(match[1], 10);
    const num2 = parseInt(match[2], 10);
    return (num1 - num2).toString();
  }

  // Handle prime number queries
  match = query.match(primeNumberRegex);
  if (match) {
    const numbers = match[1].split(',').map(num => parseInt(num.trim(), 10));
    const isPrime = (num: number) => {
      if (num <= 1) return false;
      for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
      }
      return true;
    };
    const primes = numbers.filter(isPrime);
    return primes.join(', ');
  }

  // Handle exponentiation queries
  match = query.match(exponentiationRegex);
  if (match) {
    const base = parseInt(match[1], 10);
    const exponent = parseInt(match[2], 10);
    return Math.pow(base, exponent).toString();
  }
  // Handle complex math with multiplication queries
  match = query.match(complexMathWithMultiplicationRegex);
  if (match) {
    const num1 = parseInt(match[1], 10);
    const num2 = parseInt(match[2], 10);
    const num3 = parseInt(match[3], 10);
  return (num1 * num2 + num3).toString();
  }

    // Handle exponentiation queries
  match = query.match(exponentiationRegex);
  if (match) {
    const base = parseInt(match[1], 10);
    const exponent = parseInt(match[2], 10);
    return Math.pow(base, exponent).toString();
  }

   // Handle scrabble score queries
   match = query.match(scrabbleScoreRegex);
   if (match) {
     const word = match[1].toLowerCase();
     const scrabbleScores: { [key: string]: number } = {
       a: 1, b: 3, c: 3, d: 2, e: 1, f: 4, g: 2, h: 4, i: 1, j: 8, k: 5, l: 1,
       m: 3, n: 1, o: 1, p: 3, q: 10, r: 1, s: 1, t: 1, u: 1, v: 4, w: 4, x: 8,
       y: 4, z: 10
     };
     const score = word.split('').reduce((acc, char) => acc + (scrabbleScores[char] || 0), 0);
     return score.toString();
   }

  return "";
}