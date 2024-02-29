import express from "express";
import Fruit from "../models/Fruit.js";

const router = express.Router();

router.get("/fruits", async (req, res) => {
  const fruits = await Fruit.find();
  res.json(fruits);
});

router.post("/fruits", async (req, res) => {
  const fruit = new Fruit(req.body);
  await fruit.save();
  res.status(201).send();
});

router.delete("/fruits/:id", async (req, res) => {
  const { id } = req.params;
  await Fruit.findByIdAndDelete(id);
  res.status(204).send();
});

router.put("/fruits/:id", async (req, res) => {
  const { id } = req.params;
  const fruit = await Fruit.findByIdAndUpdate(id, req.body, { new: true });
  res.json(fruit);
});

export default router;