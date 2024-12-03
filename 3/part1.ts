
const loadedInput = Deno.readFileSync("3/input.txt");
const text = new TextDecoder().decode(loadedInput);

function parse() {
  const regex = /mul\(\d+,\d+\)/g;
  const matches = text.match(regex);

  let sum = 0;

  if (matches) {
    matches.forEach((match) => {
      // extract the numbers from the match
      const numbers = match.match(/\d+/g);
      if (numbers) {
        sum += parseInt(numbers[0]) * parseInt(numbers[1]);
      }
    });
  }

  console.log(`The sum of the products is ${sum}`);
}


parse();