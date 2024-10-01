import mongoose from "mongoose";
const Schema = mongoose.Schema;

const rentalHouseSchema = new Schema(
  {
    name: { type: String, required: true },
    job: { type: Schema.Types.ObjectId, ref: "Job" },
  },
  { timestamps: true }
);

const RentalHouse = mongoose.model("RentalHouse", rentalHouseSchema);
export default RentalHouse;
