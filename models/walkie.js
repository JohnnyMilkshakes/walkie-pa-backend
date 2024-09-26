import mongoose from "mongoose";
const Schema = mongoose.Schema;

const walkieSchema = new Schema({
  number: { type: Number, required: true }, // Walkie number
  rentalHouse: {
    type: Schema.Types.ObjectId,
    ref: "RentalHouse",
    required: true,
  }, // References the rental house that provided the walkie
  department: { type: Schema.Types.ObjectId, ref: "Department" }, // Optional reference: the department assigned this walkie
  crewMember: { type: Schema.Types.ObjectId, ref: "CrewMember" }, // Optional reference: the crew member assigned this walkie
});

const Walkie = mongoose.model("Walkie", walkieSchema);
export default Walkie;
