import pool from "../dbConfig.js";

export const getAllQuotes = async (req, res) => {
  try {
    const allQuotes = await pool.query(" SELECT * FROM quotes");
    res.json(allQuotes.rows);
  } catch (error) {
    console.error(error.message);
  }
};

export const postNewQuote = async (req, res) => {
  try {
    const { quote, picture, author, publication, genre } = req.body;
    console.log(req.body);
    const newQuote = await pool.query(
      " INSERT INTO quotes (quote, picture, author, publication, genre) VALUES($1, $2, $3, $4, $5) RETURNING *",
      [quote, picture, author, publication, genre]
    );
    res.json(newQuote.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
};

export const getOneQuote = async (req, res) => {
  try {
    console.log(req.params);
    const { id } = req.params;
    const quote = await pool.query("SELECT * FROM quotes WHERE quote_id = $1", [
      id,
    ]);
    res.json(quote.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
};

export const updateQuote = async (req, res) => {
  try {
    const { id } = req.params;
    const { quote, picture, author, publication, genre } = req.body;
    const updateQuote = await pool.query(
      "UPDATE quotes SET quote = $1, picture = $2, author = $3, publication = $4, genre = $5 WHERE quote_id = $6",
      [quote, picture, author, publication, genre, id]
    );
    res.json("updated");
  } catch (error) {
    console.error(error.message);
  }
};

export const deleteQuote = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteQuote = await pool.query(
      "DELETE FROM quotes WHERE quote_id = $1",
      [id]
    );
    res.json("Quote was deleted");
  } catch (error) {
    console.error(error.message);
  }
};