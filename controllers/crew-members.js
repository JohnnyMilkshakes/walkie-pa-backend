import Department from "../models/department.js";
import CrewMember from "../models/crew-member.js";

export const getCrewMember = async (req, res) => {
  const { crewMemberId } = req.params;
  try {
    const crewMember = await CrewMember.findById(crewMemberId);

    if (crewMember) {
      res.status(200).json(crewMember);
    } else {
      res.status(401).json({ error: "Crew member not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getAllJobCrewMembers = async (req, res) => {
  try {
    const { jobId } = req.params;
    const departments = await Department.find({ job: jobId })
      .select("_id")
      .lean();

      console.log(departments)
    const departmentIds = departments.map((department) => department._id);

    const crewMembers = await CrewMember.find({
      department: { $in: departmentIds },
    }).populate({
        path: "department",
        select: "name"
    })

    res.status(201).json(crewMembers);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const createCrewMember = async (req, res) => {
  const { departmentId } = req.params;

  try {
    
    let department = await Department.findById(departmentId);
    if (!department) {
      res.status(400).json({ message: "Department not found" });
    } else {
      req.body.department = departmentId;
    }

    const newCrewMember = await CrewMember.create(req.body);

    res.status(201).json(newCrewMember);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateCrewMember = async (req, res) => {
  try {
    const { crewMemberId } = req.params;

    const crewMember = await CrewMember.findById(crewMemberId);

    // If crew member is not found, return a 404 error
    if (!crewMember) {
      return res.status(404).json({ error: "Crew Member not found" });
    }

    // Update the department fields with the data from req.body
    Object.assign(crewMember, req.body);

    // Save the updated department back to the database
    const updatedCrewMember = await crewMember.save();

    await updatedCrewMember.populate({
        path: "department",
        select: "name"
    })

    // Send the updated job as the response
    res.status(200).json(updatedCrewMember);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const deleteCrewMember = async (req, res) => {
  try {
    const { crewMemberId } = req.params;
    const deleted = await CrewMember.findByIdAndDelete(crewMemberId);

    if (deleted) {
      return res.status(200).send("Crew Member Deleted!");
    }

    throw new Error("Crew Member not found");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
