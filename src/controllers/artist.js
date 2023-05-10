const db = require("../db/index");

exports.createArtist = async (req, res) => {
  const { name, genre } = req.body;
  try {
    const {
      rows: [artist],
    } = await db.query(
      "INSERT INTO Artists (name, genre) VALUES ($1, $2) RETURNING *",
      [name, genre]
    );
    res.status(201).json(artist);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

exports.readAllArtists = async (req, res) => {
  try {
    const { rows } = await db.query("SELECT * FROM Artists");
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

exports.readSingleArtist = async (req, res) => {
  const { id } = req.params;

  try {
    const {
      rows: [artist],
    } = await db.query(`SELECT * FROM Artists WHERE id = ${id}`);
    if (artist) {
      res.status(200).json(artist);
    } else {
      throw new Error();
    }
  } catch (err) {
    res.status(404).json({ message: `artist ${id} does not exist` });
  }
};

exports.replaceArtist = async (req, res) => {
  const { name, genre } = req.body;
  const { id } = req.params;

  try {
    const {
      rows: [artist],
    } = await db.query(
      "UPDATE Artists SET name = $1, genre = $2 WHERE id = $3 RETURNING *",
      [name, genre, id]
    );
    if (artist) {
      res.status(200).json(artist);
    } else {
      throw new Error();
    }
  } catch (err) {
    res.status(404).json({ message: `artist ${id} does not exist` });
  }
};

exports.updateArtist = async (req, res) => {
  const { id } = req.params;
  const { name, genre } = req.body;

  let query, params;

  if (name && genre) {
    query = `UPDATE Artists SET name = $1, genre = $2 WHERE id = $3 RETURNING *`;
    params = [name, genre, id];
  } else if (name) {
    query = `UPDATE Artists SET name = $1 WHERE id = $2 RETURNING *`;
    params = [name, id];
  } else if (genre) {
    query = `UPDATE Artists SET genre = $1 WHERE id = $2 RETURNING *`;
    params = [genre, id];
  }

  try {
    const {
      rows: [artist],
    } = await db.query(query, params);

    if (!artist) {
      throw new Error();
    }
    res.status(200).json(artist);
  } catch (err) {
    res.status(404).json({ message: `artist ${id} does not exist` });
  }
};

exports.deleteArtist = async (req, res) => {
  const { id } = req.params;

  try {
    const {
      rows: [artist],
    } = await db.query("DELETE FROM Artists WHERE id = $1 RETURNING *", [id]);

    if (!artist) {
      throw new Error();
    }
    res.status(200).json(artist);
  } catch (err) {
    res.status(404).json({ message: `artist ${id} does not exist` });
  }
};