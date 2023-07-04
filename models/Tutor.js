const mongoose = require("mongoose");

const tutorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  date_of_birth: { type: String, required: true },
  zip_code: { type: String, required: true },
  pets: [
    {
      name: { type: String, required: true },
      species: { type: String, required: true },
      carry: { type: String, required: true },
      weight: { type: Number, required: true },
      date_of_birth: { type: String, required: true }
    }
  ]
});

module.exports = mongoose.model("Tutor", tutorSchema);
