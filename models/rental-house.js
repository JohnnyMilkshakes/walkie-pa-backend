import mongoose from "mongoose";
const Schema = mongoose.Schema;

const rentalHouseSchema = new Schema({
  name: { type: String, required: true },
});

const RentalHouse = mongoose.model("RentalHouse", rentalHouseSchema);
export default RentalHouse;
