const db = require("../config/db");

module.exports = {
  // ----------------------------------------------------------
  // POST /api/auth/login
  // ----------------------------------------------------------
  login: (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email et mot de passe requis" });
    }

    const query = `SELECT * FROM users WHERE email = '${email}' AND password = '${password}'`;

    db.get(query, (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message, query: query });
      }

      if (results.length === 0) {
        return res
          .status(401)
          .json({ error: "Email ou mot de passe incorrect" });
      }

      res.json({ message: "Connexion réussie", user: results[0] });
    });
  },

  // ----------------------------------------------------------
  // POST /api/auth/register
  // ----------------------------------------------------------
  register: (req, res) => {
    const { username, email, password, address } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        error: "Les champs username, email et mot de passe sont requis",
      });
    }

    const query = `INSERT INTO users (username, email, password, role, address) VALUES ('${username}', '${email}', '${password}', 'user', '${address || ""}')`;

    db.run(query, function (err) {
      if (err) {
        if (err.message.includes("UNIQUE")) {
          return res.status(409).json({ error: "Cet email est déjà utilisé" });
        }
        return res.status(500).json({ error: err.message, query: query });
      }

      res
        .status(201)
        .json({ message: "Inscription réussie", userId: this.lastID });
    });
  },
};
