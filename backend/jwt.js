const crypto = require("crypto");


function ownJWT (secretKey, header, payload){
    const base64url = (source) => {
        let encodedSource = Buffer.from(source).toString("base64");
        encodedSource = encodedSource.replace(/=/g, "");
        encodedSource = encodedSource.replace(/\+/g, "-");
        encodedSource = encodedSource.replace(/\//g, "_");
        return encodedSource;
    };

    const encodedHeader = base64url(JSON.stringify(header));
    const encodedPayload = base64url(JSON.stringify(payload));

    const dataToSign = `${encodedHeader}.${encodedPayload}`;

    const signature = base64url(
    crypto.createHmac("sha256", secretKey).update(dataToSign).digest("base64")
    );

    const jwtToken = `${encodedHeader}.${encodedPayload}.${signature}`;

    return jwtToken
}

module.exports = ownJWT