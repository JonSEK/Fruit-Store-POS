import express from "express";
import Purchase from "../models/Purchase.js";

const router = express.Router();

router.post("/purchase", async (req, res) => {
  const purchase = new Purchase(req.body);
  await purchase.save();
  res.status(201).send();
});

export default router;