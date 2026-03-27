const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.resolve(__dirname, "../../db.sqlite");

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Erreur de connexion à SQLite :", err.message);
  } else {
    console.log("Connecté à la base de données SQLite locale.");
  }
});

module.exports = db;
