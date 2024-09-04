import dotenv from 'dotenv';
dotenv.config();

export const envConst = {
  ...process.env,
};

const now = Date.now();

export const saltRounds = 10; // Number of salt rounds for bcrypt hashing

export const maxColors = 256*256*256*100;
export const colorLimit = 100;
export const randomColor = {
  red: Math.floor(Math.random() * 256),
  green: Math.floor(Math.random() * 256),
  blue: Math.floor(Math.random() * 256),
  alpha: (Math.floor(Math.random() * 101) / 100),
  user_id: undefined,
  status: false,
  create_date: now,
  update_date: now,
};
