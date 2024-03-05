import { Schema, model, Types } from "mongoose";

const purchaseSchema = new Schema({
  items: [
    {
      name: String,
      fruitId: Types.ObjectId,
      quantity: Number,
      pricePerUnit: Number,
    },
  ],
  totalPrice: Number,
  purchaseDate: Date,
  staffName: String,
});

const Purchase = model("Purchase", purchaseSchema);
export default Purchase;
