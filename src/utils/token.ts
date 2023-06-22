import jwt from 'jsonwebtoken';

export const signToken = (_id: string, email: string) => {
  if (!process.env.TOKEN_SECRET_SEED) {
    throw new Error('SEED TOKEN its neccessary');
  }

  const token = jwt.sign({ email, _id }, process.env.TOKEN_SECRET_SEED, {
    expiresIn: '30d',
  });
  return token;
};

export const validateToken = (token = ''): Promise<string> => {
  if (!process.env.TOKEN_SECRET_SEED) {
    throw new Error('SEED TOKEN its neccessary');
  }

  return new Promise((res, rej) => {
    try {
      jwt.verify(token, process.env.TOKEN_SECRET_SEED!, (err, payload) => {
        if (err) return rej('TOKEN INVALID');

        const { _id } = payload as { _id : string};
        res(_id);
      });
    } catch (error) {
      rej('TOKEN INVALID');
    }
  });
};
