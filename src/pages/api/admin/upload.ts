import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import { CloudImageService } from '@/api/services';

type Data = {
  message: string;
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'POST':
      return uploadFiles(req, res);

    default:
      return res.status(400).json({ message: 'Bad request' });
  }
}

async function uploadFiles(req: NextApiRequest, res: NextApiResponse<Data>) {
  const imageUrl = await parseFiles(req);
  return res.status(200).json({ message: imageUrl });
}

const parseFiles = async (req: NextApiRequest): Promise<string> => {
  return new Promise((res, rej) => {
    const form = new formidable.IncomingForm();

    form.parse(req, async (err, fields, files) => {
      if (err) {
        return rej(err);
      }

      const filePath = await saveFile(files.file as formidable.File);
      res(filePath);
    });
  });
};

const saveFile = async (file: formidable.File): Promise<string> => {
  try {
    const { secure_url } = await CloudImageService.uploader.upload(file.filepath);
    return secure_url;
  } catch (error) {
    console.log('saveFile', error);
    return 'Uploading file fail';
  }
};
