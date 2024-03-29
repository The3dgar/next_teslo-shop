import { IUser } from '@/interfaces';
import { validUserRoles } from '@/utils';
import mongoose, { Schema, model, Model } from 'mongoose';

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: {
        values: validUserRoles,
        message: '{VALUE} its not a valid role',
        default: 'client',
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

const UserModel: Model<IUser> =
  mongoose.models.User || model('User', UserSchema);

export default UserModel;
