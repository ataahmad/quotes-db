import { SeedAPIQuote } from '../interfaces/seedAPI/seedAPIResponse'
import { DBQuote } from '../interfaces/database/quote';
import * as mysql from 'mysql'


export const mapApiQuoteToQuote = (apiQuote: SeedAPIQuote): DBQuote => {
  return {
    id: apiQuote._id,
    quote: apiQuote.content,
    author: apiQuote.author
  };
};

export const createDBConnection = () => {
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

export const executeQuery = (query: string, params: Array<string> = []) => {
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

export const populateDB = async (quotes: Array<DBQuote>) => {
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
