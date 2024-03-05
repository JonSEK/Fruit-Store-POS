import express from "express";
import Purchase from "../models/Purchase.js";

const router = express.Router();

router.post("/purchases", async (req, res) => {
  const purchase = new Purchase(req.body);
  await purchase.save();
  res.status(201).send();
});

router.get("/purchases", async (req, res) => {
  const purchases = await Purchase.find();
  res.json(purchases);
});

export default router;