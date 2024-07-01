const express = require('express');
const bodyParser = require('body-parser');
const db = require('../utils/database.js');
const app = express();
const PORT = 3002;

app.use(bodyParser.json());

app.post('/log', (req, res) => {
    const { feedingTime, feederId, sensorReading } = req.body;
    const query = `INSERT INTO action_log (feedingTime, feederId, sensorReading) VALUES (?, ?, ?)`;
    db.run(query, [feedingTime, feederId, sensorReading], function(err) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.json({ id: this.lastID });
    });
});

app.get('/list', (req, res) => {
    const query = `SELECT * FROM action_log`;
    db.all(query, [], (err, rows) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.json({ actions: rows });
    });
});

app.listen(PORT, () => {
    console.log(`Logging service running on port ${PORT}`);
});
