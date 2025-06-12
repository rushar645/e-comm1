import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  phone: string;
  password: string;
  wishlist: Types.ObjectId[];
  cart: Types.ObjectId[];
  isAdmin: boolean;
  orders: Types.ObjectId[];
  isActive: boolean;
  address: Types.ObjectId[];
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: String,
  password: { type: String, required: true },
  wishlist: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
  cart: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
  isAdmin: { type: Boolean, default: false },
  orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
  isActive: { type: Boolean, default: true },
  address: [{ type: Schema.Types.ObjectId, ref: 'Address' }],
});

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);


