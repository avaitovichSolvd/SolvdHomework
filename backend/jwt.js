const crypto = require("crypto");
const secretKey = process.env.SECRET_KEY;

const base64url = (source) => {
  let encodedSource = Buffer.from(source).toString("base64");
  encodedSource = encodedSource.replace(/=/g, "");
  encodedSource = encodedSource.replace(/\+/g, "-");
  encodedSource = encodedSource.replace(/\//g, "_");
  return encodedSource;
};

const crateToken = (header, payload) => {
  const expirationTime = Math.floor(Date.now() / 1000) + 60 * 60 * 24;
  payload.exp = expirationTime;

  const encodedHeader = base64url(JSON.stringify(header));
  const encodedPayload = base64url(JSON.stringify(payload));

  console.log(encodedPayload)

  const dataToSign = `${encodedHeader}.${encodedPayload}`;

  const signature = base64url(
    crypto.createHmac("sha256", secretKey).update(dataToSign).digest("base64")
  );

  const jwtToken = `${encodedHeader}.${encodedPayload}.${signature}`;

  return jwtToken;
};

const verifyToken = (jwtToken) => {
  const [encodedHeader, encodedPayload, signature] = jwtToken.split(".");
  const dataToVerify = `${encodedHeader}.${encodedPayload}`;
  const verifiedSignature = crypto
    .createHmac("sha256", secretKey)
    .update(dataToVerify)
    .digest("base64");

  const signatureToVerify = base64url(signature);

  if (verifiedSignature === signatureToVerify) {
    try {
      const payload = JSON.parse(
        Buffer.from(base64url(encodedPayload), "base64").toString("utf-8")
      );
      return payload;
    } catch (error) {
      throw new Error("Invalid token payload");
    }
  } else {
    throw new Error("Invalid token");
  }
};

const jwt = {
  createToken: crateToken,
  verifyToken: verifyToken,
};

const middlewareAuthentication = (req, res, next) => {
  try {
    const jwtToken = req.headers.authorization;

    const result = jwt.verifyToken(jwtToken);

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

module.exports = { jwt, middlewareAuthentication };
