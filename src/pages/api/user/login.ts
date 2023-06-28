import { dbUser } from '@/api/database';
import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
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
    case 'POST':
      return loginUser(req, res);

    default:
      return res.status(400).json({ message: 'Bad request' });
  }
}

async function loginUser(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { email = '', password = '' } = req.body;

  const user = await dbUser.verifyUser(email, password);

  if (!user) {
    return res.status(400).json({
      message: 'Credenciales invalidas',
    });
  }

  const { role, name } = user;

  return res.status(200).json({
    token: Token.signToken(user._id, email),
    user: {
      email,
      name,
      role,
    },
  });
}
