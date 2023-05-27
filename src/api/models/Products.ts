import { IProducts } from '@/interfaces';
import mongoose, { Schema, model, Model } from 'mongoose';

const productSchema = new Schema(
  {
    description: {
      type: String,
      required: true,
    },
    images: [
      {
        type: String,
      },
    ],
    inStock: { type: Number, required: true, default: 0 },
    price: { type: Number, required: true, default: 0 },
    sizes: [
      {
        type: String,
        enum: {
          values: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
          message: '{VALUE} no es un size permitido',
        },
      },
    ],
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    tags: [
      {
        type: String,
      },
    ],
    title: {
      type: String,
      required: true,
      unique: true,
    },
    type: {
      type: String,
      enum: {
        values: ['shirts', 'pants', 'hoodies', 'hats'],
        message: '{VALUE} no es un type permitido',
      },
    },
    gender: {
      type: String,
      enum: {
        values: ['men', 'women', 'kid', 'unisex'],
        message: '{VALUE} no es un genero permitido',
      },
    },
  },
  {
    timestamps: true,
  }
);

// TODO: crear indice de Model

productSchema.index({ title: 'text', tags: 'text' });

const ProductModel: Model<IProducts> =
  mongoose.models.Product || model('Product', productSchema);

export default ProductModel;
