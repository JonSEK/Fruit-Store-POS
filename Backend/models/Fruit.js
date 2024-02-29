import { Schema, model } from "mongoose";

const fruitSchema = new Schema({
  name: String,
  price: Number,
});

const Fruit = model("Fruit", fruitSchema);
export default Fruit;