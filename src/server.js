import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";

// create the express app
const app = express();

// create middlewares
app.use(cors());
app.use(express.json()); // let's us read JSON requests headers/body

// log every incoming request to the terminal
app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

// connect to db
connectDB();

app.get("/", (req, res) => {
  res.json({ status: "Api is running" });
});

app.use("/api/auth", authRoutes);

// error handlers
app.use(notFound); // 404 - global level - entire business logic
app.use(errorHandler); // Catches all errors thrown anywhere

// creating the port for display the be artificats

const PORT = process.env.PORT || 5001;

// this is what checks the server and read data from it
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
