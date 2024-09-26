async function identityCheck(req, res, next) {
  try {
    // check to ensure the user ID of the auth token matches the ID found in the request
    if (req.user._id !== req.params.userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    next();
  } catch (error) {
    res.status(401).json({ error });
  }
}

export default identityCheck;
