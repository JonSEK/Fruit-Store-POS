import express from "express";
import connectDB from "./config/db.js";
import fruitRouter from "./routes/fruits.js";
import purchaseRouter from "./routes/purchase.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const port = process.env.PORT;

const app = express();

app.use(express.static(path.join(__dirname, '../Frontend/dist')));
app.use(cors());
app.use(express.json());
app.use("/api", fruitRouter);
app.use("/api", purchaseRouter);


connectDB();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
