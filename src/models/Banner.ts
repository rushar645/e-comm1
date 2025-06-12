import mongoose, { Schema, Document } from 'mongoose';

export interface IBanner extends Document {
  image: string;
  bgColor: string;
  heading: string;
  subHeading: string;
  shopNowButtonColor: string;
}

const BannerSchema = new Schema<IBanner>({
  image: { type: String, required: true },
  bgColor: { type: String, required: true },
  heading: { type: String, required: true },
  subHeading: { type: String },
  shopNowButtonColor: { type: String, required: true },
});

export default mongoose.models.Banner || mongoose.model<IBanner>('Banner', BannerSchema);
