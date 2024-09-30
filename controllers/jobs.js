import Job from "../models/job.js";
import User from "../models/user.js";
import Department from "../models/department.js";

export const getJob = async (req, res) => {
  try {
    console.log(req.params.jobId);
    const job = await Job.findById(req.params.jobId);

    if (job) {
      res.status(200).json(job);
    } else {
      res.status(401).json({ error: "Job not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getAllUserJobs = async (req, res) => {
  try {
    const userId = req.user._id;
    const jobs = await Job.find({ createdBy: userId });
    res.status(201).json(jobs);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const createJob = async (req, res) => {
  const userId = req.user._id;
  req.body.createdBy = userId;
  try {
    let user = await User.findById(userId);

    if (user) {
      const newJob = await Job.create(req.body);

      if (newJob) {
        const defaultDepartment = await Department.create({
            "name":"unassigend",
            "job": newJob._id
        });

      }

      res.status(201).json(newJob);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    const job = await Job.findById(jobId);

    // If job is not found, return a 404 error
    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }

    // Update the job fields with the data from req.body
    Object.assign(job, req.body);

    // Save the updated job back to the database
    const updatedJob = await job.save();

    // Send the updated job as the response
    res.status(200).json(updatedJob);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const deleteJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const deleted = await Job.findByIdAndDelete(jobId);

    if (deleted) {
      return res.status(200).send("Job Deleted!");
    }

    throw new Error("Job not found");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
