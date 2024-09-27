import Job from "../models/job.js";
import Walkie from "../models/walkie.js";
import RentalHouse from "../models/rental-house.js";
import CrewMember from "../models/crew-member.js";
import User from "../models/user.js";
import Department from "../models/department.js";

export const getWalkie = async (req, res) => {
  try {
    console.log(req.params.jobId);
    const walkie = await Walkie.findById(req.params.walkieId);

    if (walkie) {
      res.status(200).json({ walkie });
    } else {
      res.status(401).json({ error: "walkie not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getAllJobWalkies = async (req, res) => {
  try {
    const userId = req.user._id;
    const walkies = await Walkie.find({ createdBy: userId });
    res.status(201).json(walkies);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const createWalkie = async (req, res) => {
  const rentalId = req.body.rentalHouseId;
  const departmentId = req.body.departmentId;
  const crewMemberId = req.body.crewMemberId;

  try {
    let rentalHouse = await RentalHouse.findById(rentalId);
    if (!rentalHouse) {
      res.status(400).json({ message: "Rental House not found" });
    } else {
      req.body.rentalHouse = rentalId;
    }

    // Department is optional 
    if (departmentId) {
      let department = await Department.findById(departmentId);
      if (!department) {
        res.status(400).json({ message: "Department not found" });
      } else {
        req.body.department = departmentId;
      }
    }

    // Crew Member is optional 
    if (crewMemberId) {
      let crewMember = await CrewMember.findById(crewMemberId);
      if (!crewMember) {
        res.status(400).json({ message: "Crew Member not found" });
      } else {
        req.body.crewMember = crewMemberId;
      }
    }

    const walkie = Walkie.create(req.body);
    res.status(201).json(walkie);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateWalkie = async (req, res) => {
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

export const deleteWalkie = async (req, res) => {
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
