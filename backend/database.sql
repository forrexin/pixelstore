-- Створити базу даних
CREATE DATABASE IF NOT EXISTS pixelstore;

USE pixelstore;

-- Таблиця товарів
CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  new_price DECIMAL(10,2) NULL,
  image VARCHAR(255) NOT NULL
);

-- Таблиця замовлень
CREATE TABLE IF NOT EXISTS orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  customer_name VARCHAR(255),
  customer_email VARCHAR(255),
  customer_phone VARCHAR(50),
  total DECIMAL(12,2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблиця позицій замовлення
CREATE TABLE IF NOT EXISTS order_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Додати тестові товари
INSERT INTO products (name, price, new_price, image) VALUES
('Call Of Duty: Modern Warfare 2', 1500.00, NULL, 'https://via.placeholder.com/300?text=Call+of+Duty'),
('Horizon Forbidden West', 2000.00, NULL, 'https://via.placeholder.com/300?text=Horizon'),
('Elden Ring', 1800.00, NULL, 'https://via.placeholder.com/300?text=Elden+Ring'),
('Cyberpunk 2077', 2200.00, NULL, 'https://via.placeholder.com/300?text=Cyberpunk'),
('Red Dead Redemption 2', 2500.00, NULL, 'https://via.placeholder.com/300?text=RDR2'),
('The Witcher 3', 1400.00, NULL, 'https://via.placeholder.com/300?text=Witcher+3'),
('GTA V', 1200.00, NULL, 'https://via.placeholder.com/300?text=GTA+V'),
('Resident Evil 4', 2100.00, NULL, 'https://via.placeholder.com/300?text=RE4'),
('Hogwarts Legacy', 2300.00, NULL, 'https://via.placeholder.com/300?text=Hogwarts'),
('God of War Ragnarok', 2800.00, NULL, 'https://via.placeholder.com/300?text=God+of+War'),
('Spider-Man Remastered', 1900.00, NULL, 'https://via.placeholder.com/300?text=Spider-Man'),
('The Last of Us Part I', 2600.00, NULL, 'https://via.placeholder.com/300?text=TLOU'),
('Assassin''s Creed Mirage', 2000.00, NULL, 'https://via.placeholder.com/300?text=AC+Mirage'),
('Far Cry 6', 1700.00, NULL, 'https://via.placeholder.com/300?text=Far+Cry+6'),
('Battlefield 2042', 1800.00, NULL, 'https://via.placeholder.com/300?text=Battlefield'), 
('Dying Light 2', 2100.00, NULL, 'https://via.placeholder.com/300?text=Dying+Light'),
('Forza Horizon 5', 2400.00, NULL, 'https://via.placeholder.com/300?text=Forza'),
('Need for Speed Unbound', 1900.00, NULL, 'https://via.placeholder.com/300?text=NFS'),
('Mortal Kombat 1', 2600.00, NULL, 'https://via.placeholder.com/300?text=MK1'),
('Tekken 8', 2700.00, NULL, 'https://via.placeholder.com/300?text=Tekken+8'),
('EA Sports FC 25', 2500.00, NULL, 'https://via.placeholder.com/300?text=FC+25'),
('NBA 2K25', 2400.00, NULL, 'https://via.placeholder.com/300?text=NBA+2K'),
('Minecraft', 1300.00, NULL, 'https://via.placeholder.com/300?text=Minecraft'),
('Terraria', 400.00, NULL, 'https://via.placeholder.com/300?text=Terraria'),
('Rust', 900.00, NULL, 'https://via.placeholder.com/300?text=Rust'),
('DayZ', 1100.00, NULL, 'https://via.placeholder.com/300?text=DayZ'),
('Sea of Thieves', 1500.00, NULL, 'https://via.placeholder.com/300?text=Sea+of+Thieves'),
('Metro Exodus', 800.00, NULL, 'https://via.placeholder.com/300?text=Metro'),
('Alan Wake 2', 2500.00, NULL, 'https://via.placeholder.com/300?text=Alan+Wake'),
('Dead Space Remake', 2200.00, NULL, 'https://via.placeholder.com/300?text=Dead+Space');