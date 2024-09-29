import Department from "../models/department.js";

export const getDepartment = async (req, res) => {
  try {
    const department = await Department.findById(req.params.departmentId);

    if (department) {
      res.status(200).json({ department });
    } else {
      res.status(401).json({ error: "Department not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getAllJobDepartments = async (req, res) => {
  try {
    const { jobId } = req.params;
    const departments = await Department.find({ job: jobId });

    res.status(201).json(departments);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const createDepartment = async (req, res) => {
  req.body.job = req.params.jobId;
  try {
    const newDepartment = await Department.create(req.body);

    res.status(201).json(newDepartment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateDepartment = async (req, res) => {
  try {
    const { departmentId } = req.params;

    const department = await Department.findById(departmentId);

    // If department is not found, return a 404 error
    if (!department) {
      return res.status(404).json({ error: "Job not found" });
    }

    // Update the department fields with the data from req.body
    Object.assign(department, req.body);

    // Save the updated department back to the database
    const updatedDepartment = await department.save();

    // Send the updated job as the response
    res.status(200).json(updatedDepartment);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const deleteDepartment = async (req, res) => {
  try {
    const { departmentId } = req.params;
    const deleted = await Department.findByIdAndDelete(departmentId);

    if (deleted) {
      return res.status(200).send("Department Deleted!");
    }

    throw new Error("Department not found");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
