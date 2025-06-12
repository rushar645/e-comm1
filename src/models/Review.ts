import mongoose, { Schema, Document } from 'mongoose';

export interface IReview extends Document {
  userName: string;
  rating: number;
  comment: string;
}

const ReviewSchema = new Schema<IReview>({
  userName: { type: String, required: true },
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
});

export default mongoose.models.Review || mongoose.model<IReview>('Review', ReviewSchema);
