const Tutor = require("../repositories/tutorRepository");

async function getAllTutors() {
  return Tutor.find();
}

async function createTutor(data) {
  return Tutor.create(data);
}

async function updateTutor(id, data) {
  return Tutor.findByIdAndUpdate(id, data, { new: true });
}

async function deleteTutor(id) {
  return Tutor.findByIdAndDelete(id);
}

module.exports = {
  getAllTutors,
  createTutor,
  updateTutor,
  deleteTutor
};
