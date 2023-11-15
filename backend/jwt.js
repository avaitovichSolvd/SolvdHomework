const crypto = require("crypto");
const secretKey = process.env.SECRET_KEY;

/* global process */
/* global Buffer */

const base64url = (source) => {
  let encodedSource = Buffer.from(source).toString("base64");
  encodedSource = encodedSource.replace(/=/g, "");
  encodedSource = encodedSource.replace(/\+/g, "-");
  encodedSource = encodedSource.replace(/\//g, "_");
  return encodedSource;
};

const crateToken = (header, payload) => {
  if (!secretKey) {
    throw new Error("No secret key");
  }

  if (!payload) {
    throw new Error("No payload");
  }
  const expirationTime = Math.floor(Date.now() / 1000) + 60 * 60 * 24;
  payload.exp = expirationTime;

  const encodedHeader = base64url(JSON.stringify(header));
  const encodedPayload = base64url(JSON.stringify(payload));

  const dataToSign = `${encodedHeader}.${encodedPayload}`;

  let signature

  try {
    signature = base64url(
      crypto.createHmac("sha256", secretKey).update(dataToSign).digest("base64")
    );
  } catch (error) {
    console.error('Catch err: ', error);
  }

  const jwtToken = `${encodedHeader}.${encodedPayload}.${signature}`;

  return jwtToken;
};
const verifyToken = (token) => {
  if (!secretKey) {
    throw new Error("No secret key");
  }
  
  token = token.replace("Bearer ", "");

  try {
    const [encodedHeader, encodedPayload, signature] = token.split(".");

    // const decodedHeader = Buffer.from(encodedHeader, "base64").toString();
    const decodedPayload = Buffer.from(encodedPayload, "base64").toString();

    // const header = JSON.parse(decodedHeader);
    const payload = JSON.parse(decodedPayload);

    const currentTimestamp = Math.floor(Date.now() / 1000);
    if (payload.exp && payload.exp < currentTimestamp) {
      return { error: "Token has expired" };
    }

    const dataToSign = `${encodedHeader}.${encodedPayload}`;
    const calculatedSignature = base64url(
      crypto.createHmac("sha256", secretKey).update(dataToSign).digest("base64")
    );

    if (calculatedSignature !== signature) {
      return { error: "Invalid signature" };
    }
    return { payload };
  } catch (error) {
    return { error: "Invalid token format" };
  }
};

const jwt = {
  createToken: crateToken,
  verifyToken: verifyToken,
};

const middlewareAuthentication = (req, res, next) => {
  try {
    const authToken = req.headers.authorization;

    const result = jwt.verifyToken(authToken);

    if (result.error) {
      res
        .status(401)
        .json({ error: "Authentication failed", details: result.error });
    } else {
      next();
    }
  } catch (error) {
    res
      .status(401)
      .json({ error: "Authentication failed", details: error.message });
  }
};

module.exports = {
  jwt,
  middlewareAuthentication
};
