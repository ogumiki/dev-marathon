const express = require("express");
const app = express();

const port = 5436;

const cors = require("cors");
app.use(cors());

// ✅ ここが最重要：PUT/POSTより前に置く
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const { Pool } = require("pg");
const pool = new Pool({
  user: "user_5436",
  host: "db",
  database: "crm_5436",
  password: "pass_5436",
  port: 5432,
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.get("/customers", async (req, res) => {
  try {
    const customerData = await pool.query("SELECT * FROM customers");
    res.send(customerData.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error " + err);
  }
});

app.get("/customers/:id", async (req, res) => {
  const id = Number(req.params.id);

  try {
    const result = await pool.query(
      "SELECT * FROM customers WHERE customer_id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.delete("/customers/:id", async (req, res) => {
  const id = Number(req.params.id);

  try {
    const result = await pool.query(
      "DELETE FROM customers WHERE customer_id = $1 RETURNING customer_id",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Not found" });
    }

    res.json({ success: true, deletedId: result.rows[0].customer_id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
});

// ✅ PUTも落ちないように try/catch を付ける（超重要）
app.put("/customers/:id", async (req, res) => {
  const id = Number(req.params.id);

  try {
    const body = req.body || {};
    const company_name = body.company_name ?? null;
    const industry = body.industry ?? null;
    const contact = body.contact ?? null;
    const location = body.location ?? null;

    const result = await pool.query(
      `UPDATE customers
       SET company_name=$1, industry=$2, contact=$3, location=$4
       WHERE customer_id=$5
       RETURNING *`,
      [company_name, industry, contact, location, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Not found" });
    }

    res.json({ success: true, customer: result.rows[0] });
  } catch (err) {
    console.error("PUT /customers/:id error:", err);
    res.status(500).json({ success: false, error: String(err) });
  }
});

app.post("/add-customer", async (req, res) => {
  try {
    const { companyName, industry, contact, location } = req.body;
    const newCustomer = await pool.query(
      "INSERT INTO customers (company_name, industry, contact, location) VALUES ($1, $2, $3, $4) RETURNING *",
      [companyName, industry, contact, location]
    );
    res.json({ success: true, customer: newCustomer.rows[0] });
  } catch (err) {
    console.error(err);
    res.json({ success: false });
  }
});

app.use(express.static("public"));
