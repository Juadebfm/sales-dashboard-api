import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

// create the express app
const app = express();

// create middlewares
app.use(cors());
app.use(express.json()); // let's us read JSON requests headers/body

// connect to db
connectDB();

app.get("/", (req, res) => {
  res.json({ status: "Api is running" });
});

app.use("/api/auth", authRoutes);

// creating the port for display the be artificats

const PORT = process.env.PORT || 5001;

// this is what checks the server and read data from it
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
