import mongoose, { Schema, Document } from 'mongoose';

export interface IReview extends Document {
  userName: string;
  rating: number;
  comment: string;
}

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  material: string;
  careInstruction: string;
  options: string[]; // featured, new arrival, best seller
  sizes: string[];
  image: string[];
  clothColor: string[];
  reviews: IReview[];
}

const ReviewSchema = new Schema<IReview>({
  userName: { type: String, required: true },
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
});

const ProductSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  category: String,
  stock: Number,
  material: String,
  careInstruction: String,
  options: [String],
  sizes: [String],
  image: [String],
  clothColor: [String],
  reviews: [ReviewSchema],
});

export default mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);
