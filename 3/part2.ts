const loadedInput = Deno.readFileSync("3/input.txt");
const text = new TextDecoder().decode(loadedInput);

function parse() {
  let applyInstructions = true;
  let buffer = '';

  let sum = 0;
  for (let i = 0; i < text.length; i++) {
    buffer += text[i];

    if (buffer.endsWith("don't()")) {
      applyInstructions = false;
      buffer = '';
    } else if (buffer.endsWith("do()")) {
      applyInstructions = true;
      buffer = '';
    }

    if (applyInstructions) {
      // start matching mul(int,int) instructions
      const regex = /mul\(\d+,\d+\)/g;
      const matches = buffer.match(regex);

      if (matches) {
        matches.forEach((match) => {
          // extract the numbers from the match
          const numbers = match.match(/\d+/g);
          if (numbers) {
            sum += parseInt(numbers[0]) * parseInt(numbers[1]);
          }
        });

        buffer = '';
      }
    }
  }

  console.log(`The sum of the products is ${sum}`);
}

parse();