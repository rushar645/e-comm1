import mongoose, { Schema, Document, Types } from 'mongoose';

export interface ICoupon extends Document {
  couponCode: string;
  createdAt: Date;
  usedAt?: Date;
  usedBy?: Types.ObjectId; // Reference to User
}

const CouponSchema = new Schema<ICoupon>({
  couponCode: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
  usedAt: { type: Date },
  usedBy: { type: Schema.Types.ObjectId, ref: 'User' },
});

export default mongoose.models.Coupon || mongoose.model<ICoupon>('Coupon', CouponSchema);
