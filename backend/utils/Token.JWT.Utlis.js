
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve("../.env") });

const generateToken = (id) => {
    return jwt.sign(
        { email: user.email, id: user._id},
        process.env.jwt_secret,
        { expiresIn: '30d' }
    );
};

export default generateToken;