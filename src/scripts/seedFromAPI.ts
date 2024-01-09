import { SeedAPIQuote } from '../interfaces/seedAPI/seedAPIResponse'
import { DBQuote } from '../interfaces/database/quote';
import * as mysql from 'mysql'


const mapApiQuoteToQuote = (apiQuote: SeedAPIQuote): DBQuote => {
  return {
    id: apiQuote._id,
    quote: apiQuote.content,
    author: apiQuote.author
  };
};

const createDBConnection = () => {
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'rootpassword',
    database: 'quotes_db'
  });

  connection.connect((err: mysql.MysqlError | null) => {
    if (err) {
      console.error('Error connecting to the database:', err);
      return null;
    }
    console.log('Successfully connected to the database.');
  });

  return connection;
};

const executeQuery = (query: string, params: Array<string> = []) => {
  return new Promise((resolve, reject) => {
    const connection = createDBConnection();

    if (!connection) {
      reject('No database connection.');
      return;
    }

    connection.query(query, params, (err, results) => {
      connection.end();

      if (err) {
        reject(err);
        return;
      }

      resolve(results);
    });
  });
};

const populateDB = async (quotes: Array<DBQuote>) => {
  for (const quote of quotes) {
    const insertQuery = 'INSERT INTO quotes (id, quote, author) VALUES (?, ?, ?)';
    try {
      await executeQuery(insertQuery, [quote.id, quote.quote, quote.author]);
      console.log(`Quote ${quote.id} inserted successfully`);
    } catch (err) {
      console.error('Error inserting quote:', err);
    }
  }
};


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
