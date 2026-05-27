const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Підключення до MySQL (зміни на свої дані)
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '', // Зміни на свій пароль
  database: 'pixelstore'
});

// GET /products - отримати всі товари
app.get('/products', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM products');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /orders - створити замовлення
app.post('/orders', async (req, res) => {
  const { customerName, customerEmail, customerPhone, items, total } = req.body;

  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    const [orderResult] = await conn.query(
      'INSERT INTO orders (customer_name, customer_email, customer_phone, total) VALUES (?, ?, ?, ?)',
      [customerName, customerEmail, customerPhone, total]
    );
    const orderId = orderResult.insertId;

    for (const item of items) {
      await conn.query(
        'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)',
        [orderId, item.id, item.count, item.price]
      );
    }

    await conn.commit();
    res.json({ success: true, orderId });
  } catch (err) {
    await conn.rollback();
    res.status(500).json({ error: err.message });
  } finally {
    conn.release();
  }
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));