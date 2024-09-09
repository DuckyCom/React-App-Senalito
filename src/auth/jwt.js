import jwt from 'jsonwebtoken'

export const secretKey = "Ryurin Hanpatsu Tusagi no ryusei"

export const createToken = (user) => {
    const payload = {
        id: user.id,
        username: user.first_username
    };
     

    const options = {
        expiresIn : '1h',
        issuer : 'localhost'
    };

    return jwt.sign(payload,secretKey,options);
}

export const desencryptToken = (encryptedToken) => {

    let token = encryptedToken;
    let payloadOriginal = null;
    try {
        payloadOriginal = jwt.verify(token, secretKey);
    } catch(e) {
        console.error(e);
    }
    return payloadOriginal;
};