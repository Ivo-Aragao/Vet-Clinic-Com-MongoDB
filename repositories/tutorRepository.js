const Tutor = require("../models/tutor");
const Tutor = require("../models/Tutor");
const Tutor = require("../models/Tutor");

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
