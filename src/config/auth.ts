import * as dotenv from 'dotenv';

dotenv.config();

const expiresIn = process.env.JWT_EXPIRATION;
const secret = process.env.SECRET;

export default {
  jwt: {
    secret,
    expiresIn,
  },
};
