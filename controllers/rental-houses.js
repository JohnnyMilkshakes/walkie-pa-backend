import RentalHouse from "../models/rental-house.js";

export const getRentalHouse = async (req, res) => {
  try {
    const rentalHouse = await RentalHouse.findById(req.params.rentalHouseId);

    if (rentalHouse) {
      res.status(200).json(rentalHouse);
    } else {
      res.status(401).json({ error: "Rental house not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getAllJobRentalHouses = async (req, res) => {
  try {
    const jobId = req.params.jobId;
    const rentalHouses = await RentalHouse.find({ job: jobId });
    res.status(201).json(rentalHouses);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const createRentalHouse = async (req, res) => {
  console.log(req.params);
  const jobId = req.params.jobId;
  req.body.job = jobId;
  try {
    const newRentalHouse = await RentalHouse.create(req.body);

    res.status(201).json(newRentalHouse);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateRentalHouse = async (req, res) => {
  try {
    const { rentalHouseId } = req.params;

    const rentalHouse = await RentalHouse.findById(rentalHouseId);

    // If job is not found, return a 404 error
    if (!rentalHouse) {
      return res.status(404).json({ error: "Rental House not found" });
    }

    // Update the job fields with the data from req.body
    Object.assign(rentalHouse, req.body);

    // Save the updated job back to the database
    const updatedRentalHouse = await rentalHouse.save();

    // Send the updated job as the response
    res.status(200).json(updatedRentalHouse);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const deleteRentalHouse = async (req, res) => {
  try {
    const { rentalHouseId } = req.params;
    const deleted = await RentalHouse.findByIdAndDelete(rentalHouseId);

    if (deleted) {
      return res.status(200).send("Rental House Deleted!");
    }

    throw new Error("Rental House not found");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
