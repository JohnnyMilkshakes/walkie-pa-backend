import Walkie from "../models/walkie.js";
import RentalHouse from "../models/rental-house.js";
import CrewMember from "../models/crew-member.js";
import Department from "../models/department.js";

export const getWalkie = async (req, res) => {
  try {
    const walkie = await Walkie.findById(req.params.walkieId);

    if (walkie) {
      res.status(200).json(walkie);
    } else {
      res.status(401).json({ error: "walkie not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getAllJobWalkies = async (req, res) => {
  try {
    const { jobId } = req.params;
    const rentalHouses = await RentalHouse.find({ job: jobId })
      .select("_id")
      .lean();
    const rentalHouseIds = rentalHouses.map((rentalHouse) => rentalHouse._id);

    // This query will match all walkies associated with any rental house in the array of rental house ID's passed to it
    const walkies = await Walkie.find({
      rentalHouse: { $in: rentalHouseIds },
    });
    res.status(201).json(walkies);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const createWalkie = async (req, res) => {
  const rentalId = req.params.rentalHouseId;
  const { departmentId } = req.body;
  const { crewMemberId } = req.body;

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

    const walkie = await Walkie.create(req.body);
    res.status(201).json(walkie);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateWalkie = async (req, res) => {
  try {
    const { walkieId } = req.params;
    const { departmentId } = req.body;
    const { crewMemberId } = req.body;

    const walkie = await Walkie.findById(walkieId);

    // If walkie is not found, return a 404 error
    if (!walkie) {
      return res.status(404).json({ error: "Walkie not found" });
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

    // Update the walkie fields with the data from req.body
    Object.assign(walkie, req.body);

    // Save the updated walkie back to the database
    const updatedWalkie = await walkie.save();

    // Send the updated walkie as the response
    res.status(200).json(updatedWalkie);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const deleteWalkie = async (req, res) => {
  try {
    const { walkieId } = req.params;
    const deleted = await Walkie.findByIdAndDelete(walkieId);

    if (deleted) {
      return res.status(200).send("Walkie Deleted!");
    }

    throw new Error("Walkie not found");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
