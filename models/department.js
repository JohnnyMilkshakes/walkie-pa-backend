import mongoose from "mongoose";
const Schema = mongoose.Schema;

const departmentSchema = new Schema({
  name: { type: String, required: true },
  job: {
    // References the job this department belongs to
    type: Schema.Types.ObjectId,
    ref: "Job",
    required: true,
  },
  departmentHead: {
    // References the crew member who is the department head
    type: Schema.Types.ObjectId,
    ref: "CrewMember",
  },
  walkiePerson: {
    // References the crew member that is responsible for the walkies for this department
    type: Schema.Types.ObjectId,
    ref: "CrewMember",
  },
}, { timestamps: true, });

const Department = mongoose.model("Department", departmentSchema);
export default Department;
