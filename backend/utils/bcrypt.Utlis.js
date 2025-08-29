
import bcrypt from 'bcrypt';


const hashPassword = async (pass) => {
    try {

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(pass, salt);
        return hashedPassword;

    } catch (error) {
        throw new Error(`Error hashing password: ${error.message}`);
    };
};


const verifyPassword = async (pass, hash) => {
    try {
        return await bcrypt.compare(pass, hash);
    } catch (error) {
        throw new Error(`Error verifying password: ${error.message}`);
    };
};


export { hashPassword, verifyPassword };