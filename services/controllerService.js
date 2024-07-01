const express = require('express');
const bodyParser = require('body-parser');
const db = require('../utils/database.js');
const app = express();
const PORT = 3001;

app.use(bodyParser.json());

app.post('/feeder/create', (req, res) => {
    const { location, name } = req.body;
    const query = `INSERT INTO feeder (location, name) VALUES (?, ?)`;
    db.run(query, [location, name], function(err) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.json({ id: this.lastID });
    });
});

app.get('/feeder/list', (req, res) => {
    const query = `SELECT * FROM feeder`;
    db.all(query, [], (err, rows) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.json({ feeders: rows });
    });
});

app.delete('/feeder/delete', (req, res) => {
    const { feederId } = req.body;
    const query = `DELETE FROM feeder where id = ?`;
    db.all(query, [feederId], function(err, rows) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.json({ feeders: rows });
    });
});

app.post('/config/create', (req, res) => {
    const { height, timeInterval, feederId } = req.body;
    const query = `INSERT INTO configuration (height, timeInterval, feederId) VALUES (?, ?, ?)`;
    db.run(query, [height, timeInterval, feederId], function(err) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.json({ id: this.lastID });
    });
});

app.get('/config/:feederId', (req, res) => {
    const query = `SELECT id, height, feederId, timeInterval FROM configuration WHERE feederId = ?`;
    db.get(query, [req.params.feederId], (err, row) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.json({ config: row });
    });
});

app.put('/config/update', (req, res) => {
    const { id, height, timeInterval } = req.body;
    const query = `UPDATE configuration SET height = ?, timeInterval = ? WHERE id = ?`;
    db.run(query, [ height, timeInterval, id], function(err) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.json({ id: id });
    });
});

app.listen(PORT, () => {
    console.log(`Controller service running on port ${PORT}`);
});
