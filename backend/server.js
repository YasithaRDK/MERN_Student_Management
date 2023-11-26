import express from "express";
import cors from "cors";
import colors from "colors";
import dotenv from "dotenv";
import routes from "./routes/studentRoutes.js";
import connectDB from "./config/db.js";
import errorHandler from "./middleware/studentMiddleware.js";

dotenv.config();

connectDB();

const app = express();

const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

app.use("/api/students", routes);
app.all("*", (req, res) => res.send("That route doesn't exist"));

app.use(errorHandler);

app.listen(port, () =>
  console.log(`Server started on port ${port}`.cyan.underline)
);
