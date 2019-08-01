const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const verifyOptions = {
    algorithms: ["RS256", "RS512", "HS256", "HS384"]
}

const signOptions = {
    algorithm: "RS512",
    expiresIn: "2d"
}

const privateKey = fs.readFileSync(path.join(__dirname, '../../../RSA_keys', 'private.key.txt'));
const publicKey = fs.readFileSync(path.join(__dirname, '../../../RSA_keys', 'public.key.txt'));

const signToken = async payload => {
    // Sign token wrapping payload provided by the user
    const token = await jwt.sign(payload, privateKey, signOptions);
    return token;
}

const getUserId = async token => {
    // Verify token and return id of the user from payload of jwt.
    const user = await jwt.verify(token, publicKey, verifyOptions);
    // Return the mongoId for the user
    return user.userId;
}

const decodeToken = async token => {
    // Decode the jwt to extract the information
    const decodedToken = await jwt.decode(token, { complete: true });
    return decodedToken;
}

module.exports = { signToken, getUserId, decodeToken };