import jwt from "jsonwebtoken";

function verifyToken(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];

    // Add in verify method
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Assign decoded payload to req.user
    req.user = decoded;

    // Call next() to invoke the next middleware function
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token." });
  }
}

export default verifyToken;
