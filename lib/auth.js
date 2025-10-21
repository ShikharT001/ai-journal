import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
const JWT_SECRET = process.env.JWT_SECRET || 'devsecret';
export async function hashPassword(pwd) { return await bcrypt.hash(pwd, 10); }
export async function comparePassword(pwd, hash) { return await bcrypt.compare(pwd, hash); }
export function createToken(payload) { return jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' }); }
export function verifyToken(token) {
  try {
    if (!token) return null;
    return jwt.verify(token, JWT_SECRET);
  } catch (e) {
    return null;
  }
}
