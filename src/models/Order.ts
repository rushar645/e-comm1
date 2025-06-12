import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IOrder extends Document {
  orderId: string;
  trackingId: string;
  customerName: string;
  date: Date;
  total: number;
  status: string;
  items: Types.ObjectId[]; // Reference to Product
  coupon?: string;
}

const OrderSchema = new Schema<IOrder>({
  orderId: { type: String, required: true },
  trackingId: String,
  customerName: { type: String, required: true },
  date: { type: Date, default: Date.now },
  total: { type: Number, required: true },
  status: String,
  items: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
  coupon: String,
});

export default mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);
