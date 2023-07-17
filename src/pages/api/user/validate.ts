import { dbUser } from '@/api/database';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Token } from '@/utils';

interface UserLogin {
  name: string;
  role: string;
  email: string;
}

type Data =
  | {
      message: string;
    }
  | {
      token: string;
      user: UserLogin;
    };

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'GET':
      return validateUser(req, res);

    default:
      return res.status(400).json({ message: 'Bad request' });
  }
}

async function validateUser(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { token = '' } = req.cookies;
  if (!token) {
    return res.status(401).json({
      message: 'TOKEN INVALID',
    });
  }
  try {
    const userId = await Token.validateToken(token);

    const user = await dbUser.getUserById(userId);
    if (!user) {
      return res.status(400).json({
        message: 'User does not exist',
      });
    }

    const { _id, email, name, role } = user;

    return res.status(200).json({
      token: Token.signToken(_id, email),
      user: {
        email,
        name,
        role,
      },
    });
  } catch (error) {
    return res.status(401).json({
      message: 'TOKEN INVALID',
    });
  }
}
