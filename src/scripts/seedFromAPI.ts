import { SeedAPIQuote } from '../interfaces/seedAPI/seedAPIResponse'
import { DBQuote } from '../interfaces/database/quote';
import { mapApiQuoteToQuote, populateDB } from './scriptHelpers'
import * as readline from 'readline';



const seedQuotes = async (limit: number = 1) => {

  let apiURL = 'https://api.quotable.io/quotes/random'
  if (limit > 1) apiURL = `https://api.quotable.io/quotes/random?limit=${limit}`
  const res = await fetch(apiURL);
  const quotes = await res.json();

  const formattedDbQuotes: Array<DBQuote> = []
  if (Array.isArray(quotes)) {
    for (let ind = 0; ind < quotes.length; ind++) {
      let unformattedQuote: SeedAPIQuote = quotes[ind]
      formattedDbQuotes.push(mapApiQuoteToQuote(unformattedQuote))
    }

    await populateDB(formattedDbQuotes)
  } else {
    console.error('The API has returned invalid data')
  }
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


rl.question('How many quotes do you want to populate?\n', (input) => {

  let numInput: number
  if (typeof input === "string" && !Number.isNaN(Number(input))) {
    numInput = Number(input);
  } else {
    console.error("Invalid Number Entered")
    rl.close()
    return
  }


  if (numInput > 1000) {
    console.log("Limit is set at 1000 quotes\nSeeding 1000 quotes...")
    seedQuotes(1000)
  } else {
    console.log(`Seeding ${numInput} quotes...`)
    seedQuotes(numInput)
  }
  
  rl.close();
});
