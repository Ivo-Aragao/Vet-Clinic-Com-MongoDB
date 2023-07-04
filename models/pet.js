const mongoose = require("mongoose");

const petSchema = new mongoose.Schema({
  name: { type: String, required: true },
  species: { type: String, required: true },
  carry: { type: String, required: true },
  weight: { type: Number, required: true },
  date_of_birth: { type: Date, required: true },
  tutor: { type: mongoose.Schema.Types.ObjectId, ref: "Tutor", required: true },
});

const Pet = mongoose.model("Pet", petSchema);

module.exports = Pet;
