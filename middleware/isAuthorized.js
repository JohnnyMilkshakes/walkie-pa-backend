import Job from "../models/job.js";

async function isAuthorized(req, res, next) {
  try {
    const jobId = req.params.jobId;
    const userId = req.user._id;
    let hasPermission = false;

    const job = await Job.findById(jobId);

    if (job) {
      if (job.createdBy.toString() === userId) {
        hasPermission = true;
      }
    } else {
        return res.status(404).send("Job not found");
    }

    if (!hasPermission) {
      return res.status(403).send("User does not have the required permission");
    }

    next();
  } catch (err) {
    console.log(err);
  }
}

export default isAuthorized;
