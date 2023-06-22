import { dbUser } from '@/api/database';
import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import { Token, Validations } from '@/utils';

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
      return registerUser(req, res);

    default:
      return res.status(400).json({ message: 'Bad request' });
  }
}

async function registerUser(req: NextApiRequest, res: NextApiResponse<Data>) {
  const {
    email = '',
    password = '',
    name = '',
  } = req.body as { email: string; password: string; name: string };

  const user = await dbUser.getUserByEmail(email);
  if (user) {
    // aumentar el tiempo de peticion
    return res.status(400).json({
      message: 'You can not use this user',
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      message: 'Password length must be min 6',
    });
  }

  if (name.length < 3) {
    return res.status(400).json({
      message: 'Name length must be min 3',
    });
  }

  if (!Validations.isValidEmail(email)) {
    return res.status(400).json({
      message: 'Email must be valid',
    });
  }

  const role = 'client';

  try {
    const newUser = await dbUser.createUser({
      email: email.toLowerCase(),
      password: bcrypt.hashSync(password),
      name,
      role,
    });

    return res.status(200).json({
      token: Token.signToken(newUser._id, email),
      user: {
        email,
        name,
        role,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Checks server logs',
    });
  }
}
