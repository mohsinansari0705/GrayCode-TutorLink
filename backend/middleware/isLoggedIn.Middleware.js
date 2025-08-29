
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/user.Models.js';

dotenv.config({ path: path.resolve("../.env") });

const isLoggedIn = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.redirect('/login');
    };
    
    try {
        const decoded = jwt.verify(token, process.env.jwt_secret);
        const user = await User
        .findOne({email: decoded.email})
        .select('-password');
        if (!user) {
            return res.redirect('/login');
        };
        req.user = user;
        next();

    } catch (error) {
        return res.redirect('/login');
        throw new Error(`The user isn't logged in: ${error}`)
    };
};

export default isLoggedIn;