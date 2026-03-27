-- ---------------------------------------------------------------
-- Table users
-- ---------------------------------------------------------------
CREATE TABLE IF NOT EXISTS users (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    username   VARCHAR(50)  NOT NULL,
    email      VARCHAR(100) NOT NULL UNIQUE,
    password   VARCHAR(255) NOT NULL,
    role       VARCHAR(20)  NOT NULL DEFAULT 'user',
    address    VARCHAR(255),
    photo_path VARCHAR(255)
);

-- ---------------------------------------------------------------
-- Table products
-- ---------------------------------------------------------------
CREATE TABLE IF NOT EXISTS products (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    name        VARCHAR(100) NOT NULL,
    description TEXT,
    price       DECIMAL(10, 2) NOT NULL,
    image_url   VARCHAR(500)
);

-- ---------------------------------------------------------------
-- Données de départ
-- ---------------------------------------------------------------
INSERT INTO users (username, email, password, role, address) VALUES
    ('admin',  'admin@webshop.com', 'admin123',  'admin', '1 Rue de la Paix, 1000 Lausanne'),
    ('alice',  'alice@webshop.com', 'password1', 'user',  '42 Avenue des Alpes, 1200 Genève');

INSERT INTO products (name, description, price, image_url) VALUES
    (
        'Casque Audio Pro X1',
        'Un casque confortable et moderne, parfait pour demarrer une vitrine produit.',
        89.00,
        'https://images.unsplash.com/photo-1518444065439-e933c06ce9cd?auto=format&fit=crop&w=600&q=80'
    );
