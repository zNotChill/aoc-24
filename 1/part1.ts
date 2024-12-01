
const loadedInput = Deno.readFileSync("1/input.txt");
const parsedInput: number[][] = [];
const sortedLeftList: number[] = [];
const sortedRightList: number[] = [];

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

function pairAndSum() {
  const distances: number[] = [];
  for (let i = 0; i < sortedLeftList.length; i++) {
    distances.push(Math.abs(sortedRightList[i] - sortedLeftList[i]));
  }
  return distances.reduce((a, b) => a + b, 0);
}

parseInput();
sortLists();
const value = pairAndSum();

console.log(`The sum of the distances between the pairs is ${value}`);