const sqlite3 = require('sqlite3').verbose();

const DBSOURCE = "db.sqlite";

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        console.error(err.message);
        throw err;
    } else {
        console.log('Connected to the SQLite database.');
        db.run(`CREATE TABLE IF NOT EXISTS feeder (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            location TEXT
        )`);

        db.run(`CREATE TABLE IF NOT EXISTS configuration (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            height INTEGER,
            timeInterval INTEGER,
            feederId INTEGER,
            FOREIGN KEY(feederId) REFERENCES feeder(id)
        )`);

        db.run(`CREATE TABLE IF NOT EXISTS action_log (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            feedingTime TEXT,
            feederId INTEGER,
            sensorReading FLOAT,
            FOREIGN KEY(feederId) REFERENCES feeder(id)
        )`);
    }
});

module.exports = db;