import * as dotenv from 'dotenv';

dotenv.config();

const secret = process.env.SECRET;
const expiresIn = process.env.JWT_EXPIRATION;

export default {
  jwt: {
    secret,
    expiresIn,
  },
};
