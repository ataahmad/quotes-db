import { SeedAPIQuote } from '../interfaces/seedAPI/seedAPIResponse'
import { DBQuote } from '../interfaces/database/quote';
import { mapApiQuoteToQuote, populateDB } from './scriptHelpers'


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

seedQuotes(5)
