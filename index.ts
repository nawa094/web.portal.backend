import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import * as swaggerDocument from "./swagger.json";

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("dev"));

import mssql from "mssql";

const dbConfig = {
  server: "",
  database: "",
  user: "",
  password: "",
  options: {
    encrypt: true, // Enable encryption
    trustServerCertificate: true, // Trust server certificate
  },
};

// Create a connection pool
const pool = new mssql.ConnectionPool(dbConfig);

// Connect to the database
pool
  .connect()
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err);
  });

// Routes
// Example route using the database connection
app.get("/users", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM Users");
    res.json(result.recordset);
    pool.close();
  } catch (err) {
    console.error("SQL error", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/stock/movements", (req: Request, res: Response) => {
  // Mock response data
  const responseData = {
    report_name: "Stock Movement Report",
    last_updated: new Date().toISOString(),
    movements: [
      {
        product_code: "ABC123",
        description: "Product ABC",
        stock: {
          head_office: 100,
          in_transit: 50,
          at_branch: 200,
          total: 350,
          suggested_stock: 400,
        },
        percentage_growth: 10,
        suggested_order_quantity: 50,
        factory_quantity: 100,
        estimated_sales_volume: 150,
        order_quantity: 50,
        fast_moving_label_indicator: true,
      },
      // Add more movement objects as needed
    ],
  };

  res.status(200).json(responseData);
});

// Endpoint to confirm stock orders
app.post("/stock/orders/confirm", (req: Request, res: Response) => {
  // Placeholder for actual order confirmation logic
  res.status(200).json({ message: "Stock orders confirmed successfully." });
});

// Endpoint to get all branches
app.get("/branches", (req: Request, res: Response) => {
  // Mock response data
  const branches = [
    { id: "1", description: "Branch A" },
    { id: "2", description: "Branch B" },
    // Add more branch objects as needed
  ];

  res.status(200).json(branches);
});

// Endpoint to search for branches
app.post("/branches", (req: Request, res: Response) => {
  // Placeholder for actual branch search logic
  const { search_query } = req.body;
  const results = [
    { id: "1", description: "Branch A" },
    { id: "2", description: "Branch B" },
    // Add more branch objects as needed
  ];

  res.status(200).json(results);
});

// Endpoint to get all customers
app.get("/customers", (req: Request, res: Response) => {
  // Mock response data
  const customers = [
    { id: "1", description: "Customer A" },
    { id: "2", description: "Customer B" },
    // Add more customer objects as needed
  ];

  res.status(200).json(customers);
});

// Endpoint to search for customers
app.post("/customers", (req: Request, res: Response) => {
  // Placeholder for actual customer search logic
  const { search_query } = req.body;
  const results = [
    { id: "1", description: "Customer A" },
    { id: "2", description: "Customer B" },
    // Add more customer objects as needed
  ];

  res.status(200).json(results);
});

// Endpoint to get all label types
app.get("/label-types", (req: Request, res: Response) => {
  // Mock response data
  const labelTypes = [
    { id: "1", description: "Label Type A" },
    { id: "2", description: "Label Type B" },
    // Add more label type objects as needed
  ];

  res.status(200).json(labelTypes);
});

// Endpoint to search for label types
app.post("/label-types", (req: Request, res: Response) => {
  // Placeholder for actual label type search logic
  const { search_query } = req.body;
  const results = [
    { id: "1", description: "Label Type A" },
    { id: "2", description: "Label Type B" },
    // Add more label type objects as needed
  ];

  res.status(200).json(results);
});

app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
