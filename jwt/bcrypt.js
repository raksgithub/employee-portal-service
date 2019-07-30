const bcrypt = require('bcrypt');

// Genarate hased password
const generateHash = async (plainPassword, saltRounds = 10) => {
    try {
        const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
        return hashedPassword
    }
    catch (err) {
        console.log('Error has occured.', err);
    }
}

// Compare hashed Password
const comparePassword = async (plainPassword, hashedPassword) => {
    try {
        const isSame = await bcrypt.compare(plainPassword, hashedPassword);
        return isSame;
    }
    catch(err) {
        console.log('Error has occured.', err);
    }
}

module.exports = { generateHash, comparePassword }
