
const loadedInput = Deno.readFileSync("1/input.txt");
const parsedInput: number[][] = [];
const sortedLeftList: number[] = [];
const sortedRightList: number[] = [];
const leftFrequencyMap: Map<number, number> = new Map();
const rightFrequencyMap: Map<number, number> = new Map();

function parseInput() {
  const text = new TextDecoder().decode(loadedInput);
  const lines = text.split("\n");
  for (const line of lines) {
    const split = line.split("   ");
    parsedInput.push(
      [
        parseInt(split[0]),
        parseInt(split[1]),
      ]
    )
  }
}

function sortLists() {
  for (const pair of parsedInput) {
    sortedLeftList.push(pair[0]);
    sortedRightList.push(pair[1]);
  }
  sortedLeftList.sort((a, b) => a - b);
  sortedRightList.sort((a, b) => a - b);
}

function createFrequencyMaps() {
  for (const value of sortedLeftList) {
    if (leftFrequencyMap.has(value)) {
      leftFrequencyMap.set(value, leftFrequencyMap.get(value)! + 1);
    } else {
      leftFrequencyMap.set(value, 1);
    }
  }

  for (const value of sortedRightList) {
    if (rightFrequencyMap.has(value)) {
      rightFrequencyMap.set(value, rightFrequencyMap.get(value)! + 1);
    } else {
      rightFrequencyMap.set(value, 1);
    }
  }
}

function createSimilarityScore() {
  // multiply frequency in left list by frequency in right list
  // sum all the products
  let sum = 0;
  for (const [key] of leftFrequencyMap) {
    if (rightFrequencyMap.has(key)) {
      sum += key * rightFrequencyMap.get(key)!;
    }
  }
  return sum;
}

parseInput();
sortLists();
createFrequencyMaps();
const value = createSimilarityScore();

console.log(`The similarity score is ${value}`);