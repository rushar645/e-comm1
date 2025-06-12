import mongoose, { Schema, Document } from 'mongoose';

export interface IAddress extends Document {
  country: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  pin: string;
  phone: string;
}

const AddressSchema = new Schema<IAddress>({
  country: String,
  firstName: String,
  lastName: String,
  address: String,
  city: String,
  state: String,
  pin: String,
  phone: String,
});

export default mongoose.models.Address || mongoose.model<IAddress>('Address', AddressSchema);
