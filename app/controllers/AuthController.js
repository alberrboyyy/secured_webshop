const db = require("../config/db");
const argon2 = require("argon2");

module.exports = {
  // ----------------------------------------------------------
  // POST /api/auth/login
  // ----------------------------------------------------------
  login: async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email et mot de passe requis" });
    }

    const query = `SELECT * FROM users WHERE email = '${email}'`;

    db.get(query, async (err, row) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      if (!row) {
        return res
          .status(401)
          .json({ error: "Email ou mot de passe incorrect" });
      }

      try {
        const match = await argon2.verify(row.password, password);

        if (!match) {
          return res
            .status(401)
            .json({ error: "Email ou mot de passe incorrect" });
        }

        delete row.password;

        res.json({ message: "Connexion réussie", user: row });
      } catch (err) {
        return res.status(500).json({ error: "Erreur interne du serveur" });
      }
    });
  },

  // ----------------------------------------------------------
  // POST /api/auth/register
  // ----------------------------------------------------------
  register: async (req, res) => {
    const { username, email, password, address } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        error: "Les champs username, email et mot de passe sont requis",
      });
    }

    try {
      const hashedPassword = await argon2.hash(password, {
        type: argon2.argon2id,
        memoryCost: 2 ** 16, // 64 Mo
        timeCost: 3,
        parallelism: 1,
      });

      const query = `INSERT INTO users (username, email, password, role, address) VALUES ('${username}', '${email}', '${hashedPassword}', 'user', '${address || ""}')`;

      db.run(query, function (err) {
        if (err) {
          if (err.message.includes("UNIQUE")) {
            return res
              .status(409)
              .json({ error: "Cet email est déjà utilisé" });
          }
          return res.status(500).json({ error: err.message, query: query });
        }

        res
          .status(201)
          .json({ message: "Inscription réussie", userId: this.lastID });
      });
    } catch (err) {
      res.status(500).json({ error: "Erreur lors du hachage" });
    }
  },
};
