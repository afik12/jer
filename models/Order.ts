import mongoose, { Model } from "mongoose";
import type { Order as OrderType } from "@/types/order";

const OrderLineItemSchema = new mongoose.Schema({
  jerseyId: String,
  title: String,
  quantity: Number,
  size: String,
  customName: String,
  customNumber: String,
  price: Number,
  imageUrl: String,
}, { _id: false });

const OrderCustomerSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  city: String,
  address: String,
}, { _id: false });

const OrderSchema = new mongoose.Schema<OrderType>(
  {
    items: [OrderLineItemSchema],
    customer: OrderCustomerSchema,
    shippingMethod: { type: String, enum: ["home-delivery", "self-collection"] },
    paymentMethod: { type: String, enum: ["credit-card", "whatsapp-bit"] },
    subtotal: Number,
    orderId: { type: String, unique: true },
    status: { type: String, enum: ["pending-payment", "paid", "completed"], default: "pending-payment" },
  },
  { collection: "orders", timestamps: true }
);

export const OrderModel: Model<OrderType> =
  mongoose.models.Order ?? mongoose.model<OrderType>("Order", OrderSchema);
