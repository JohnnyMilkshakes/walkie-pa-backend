import mongoose from "mongoose";
const Schema = mongoose.Schema;

const crewMemberSchema = new Schema(
  {
    name: { type: String, required: true },
    jobTitle: { type: String },
    department: {
      // References the department they belong to
      type: Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },
  },
  { timestamps: true }
);

const CrewMember = mongoose.model("CrewMember", crewMemberSchema);
export default CrewMember;
