import type { NextApiRequest, NextApiResponse } from 'next';

import { db, dbProducts } from '@/api/database';
import { IProducts } from '@/interfaces';
import { isValidObjectId } from 'mongoose';
import { CloudImageService } from '@/api/services';

type Data = { message: string } | IProducts[] | IProducts;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'GET':
      return getProducts(req, res);
    case 'PUT':
      return updateProducts(req, res);
    case 'POST':
      return createProduct(req, res);

    default:
      return res.status(400).json({ message: 'Bad request' });
  }
}

const getProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await db.connect();

  const products = await dbProducts.getAllProductsForAdmin();

  await db.disconnect();

  res.status(200).json(products);
};

async function updateProducts(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { _id = '', images = [] } = req.body as IProducts;
  if (!isValidObjectId(_id)) {
    return res.status(400).json({
      message: 'Invalid id',
    });
  }

  if (images.length < 2) {
    return res.status(400).json({
      message: 'Min 2 images',
    });
  }

  // posiblemente tendremos un localhost:3000/products/asasdas.jpg

  try {
    await db.connect();
    const product = await dbProducts.getById(_id);

    if (!product) {
      await db.disconnect();
      return res.status(400).json({
        message: 'Product dont exist',
      });
    }

    // todo eliminar fotos en cloudinary provedor
    product.images.forEach(async (img) => {
      if (!images.includes(img)) {
        const [fileId, extension] = img.substring(img.lastIndexOf('/') + 1).split(".");
        await CloudImageService.uploader.destroy(fileId)
      }
    });

    const productUpdated = await dbProducts.updateProduct(req.body);

    await db.disconnect();
    return res.status(200).json(productUpdated);
  } catch (error) {
    await db.disconnect();

    console.log(error);

    return res.status(400).json({
      message: 'see server logs',
    });
  }
}

async function createProduct(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { images = [], slug } = req.body as IProducts;

  if (images.length < 2) {
    return res.status(400).json({
      message: 'Min 2 images',
    });
  }

  // posiblemente tendremos un localhost:3000/products/asasdas.jpg

  try {
    await db.connect();
    const productInDb = await dbProducts.getProductBySlug(slug);
    if (productInDb) {
      await db.disconnect();
      return res.status(400).json({
        message: 'Slug exist!',
      });
    }

    const product = await dbProducts.createProduct(req.body);

    await db.disconnect();
    return res.status(201).json(product);
  } catch (error) {
    await db.disconnect();

    console.log(error);

    return res.status(400).json({
      message: 'see server logs',
    });
  }
}
