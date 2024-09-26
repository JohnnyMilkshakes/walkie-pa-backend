async function isAuthorized(req, res, next) {
  const jobId = req.params.jobId;
  const userId = req.user.id;

  // find if user is associated with the jobId

  if (!hasPermission) {
    return res.status(403).send("User does not have the required permission");
  }

  next();
}

export default isAuthorized;
