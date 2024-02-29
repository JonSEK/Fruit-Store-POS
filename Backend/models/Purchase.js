import { Schema, model, Types } from "mongoose";

const purchaseSchema = new Schema({
  fruitId: Types.ObjectId,
  quantity: Number,
  totalPrice: Number,
  purchaseDate: Date,
});

const Purchase = model("Purchase", purchaseSchema);
export default Purchase;
