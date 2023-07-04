<<<<<<< HEAD
<<<<<<< HEAD
const Tutor = require("../models/tutor");
=======
const Tutor = require("../models/Tutor");
>>>>>>> 7dcf465d79c9d21d48de9665f334d03d79419da6
=======
const Tutor = require("../models/Tutor");
>>>>>>> 7dcf465d79c9d21d48de9665f334d03d79419da6

async function find() {
  return Tutor.find();
}

async function findById(id) {
  return Tutor.findById(id);
}

module.exports = {
  find,
  findById
};
