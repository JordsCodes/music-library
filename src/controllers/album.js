const db = require('../db/index');

exports.createAlbum = async (req, res) => {
  const { name, year } = req.body;
  const artistID = req.params.id;

  try {
    const {
      rows: [album],
    } = await db.query(
      'INSERT INTO Albums (name, year, artistID) VALUES ($1, $2, $3) RETURNING *',
      [name, year, artistID]
    );
    res.status(201).json(album);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

exports.readAllAlbums = async (_, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM Albums');
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

exports.readSingleAlbum = async (req, res) => {
  const { id } = req.params;

  try {
    const {
      rows: [album],
    } = await db.query(`SELECT * FROM Albums WHERE id = ${id}`);
    if (!album) {
      res.status(404).json({ message: `album ${id} does not exist` });
    }
    res.status(200).json(album);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

exports.replaceAlbum = async (req, res) => {
  const { name, year, artistID } = req.body;
  const { id } = req.params;

  try {
    const {
      rows: [album],
    } = await db.query(
      'UPDATE Albums SET name = $1, year = $2, artistID = $3 WHERE id = $4 RETURNING *',
      [name, year, artistID, id]
    );
    if (!album) {
      res.status(404).json({ message: `album ${id} does not exist` });
    }
    res.status(200).json(album);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

exports.updateAlbum = async (req, res) => {
  const { id } = req.params;
  const { name, year, artistid } = req.body;
  let query, params;

  if (name && year && artistid) {
    query = `UPDATE Albums SET name = $1, year = $2, artistID = $3 WHERE id = $4 RETURNING *`;
    params = [name, year, artistid, id];
  } else if (name && year) {
    query = `UPDATE Albums SET name = $1, year = $2 WHERE id = $3 RETURNING *`;
    params = [name, year, id];
  } else if (name && artistid) {
    query = `UPDATE Albums SET name = $1, artistID = $2 WHERE id = $3 RETURNING *`;
    params = [name, artistid, id];
  } else if (year && artistid) {
    query = `UPDATE Albums SET year = $1, artistID = $2 WHERE id = $3 RETURNING *`;
    params = [year, artistid, id];
  } else if (name) {
    query = `UPDATE Albums SET name = $1 WHERE id = $2 RETURNING *`;
    params = [name, id];
  } else if (year) {
    query = `UPDATE Albums SET year = $1 WHERE id = $2 RETURNING *`;
    params = [year, id];
  } else if (artistid) {
    query = `UPDATE Albums SET artistID = $1 WHERE id = $2 RETURNING *`;
    params = [artistid, id];
  }
  try {
    const {
      rows: [album],
    } = await db.query(query, params);

    if (!album) {
      return res.status(404).json({ message: `album ${id} does not exist` });
    }

    res.status(200).json(album);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

exports.deleteAlbum = async (req, res) => {
  const { id } = req.params;

  try {
    const {
      rows: [album],
    } = await db.query('DELETE FROM Albums WHERE id = $1 RETURNING *', [id]);

    if (!album) {
      res.status(404).json({ message: `album ${id} does not exist` });
    }
    res.status(200).json(album);
  } catch (err) {
    res.status(500).json(err.message);
  }
};
