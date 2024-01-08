import { SeedAPIQuote } from './../interfaces/seedAPI/seedAPIResponse'
import { DBQuote } from './../interfaces/database/quote';


const mapApiQuoteToQuote = (apiQuote: SeedAPIQuote): DBQuote => {
  return {
    id: apiQuote._id,
    quote: apiQuote.content,
    author: apiQuote.author
  };
};


async function randomQuote() {
  const response = await fetch('https://api.quotable.io/quotes/random?limit=1')
  const quote = await response.json()

  console.log(quote)
}

const fetchQuotes = async (limit: number = 1) => {

  let apiURL = 'https://api.quotable.io/quotes/random'
  if (limit > 1) apiURL = `https://api.quotable.io/quotes/random?limit=${limit}`
  const res = await fetch(apiURL);
  const quotes = await res.json();

  const formattedDbQuotes = []
  if (Array.isArray(quotes)) {
    for (let ind = 0; ind < quotes.length; ind++) {
      let unformattedQuote: SeedAPIQuote = quotes[ind]
      formattedDbQuotes.push(mapApiQuoteToQuote(unformattedQuote))
    }
  } else {
    console.error('The API has returned invalid data')
  }

  console.log(formattedDbQuotes)
}

fetchQuotes(5)
