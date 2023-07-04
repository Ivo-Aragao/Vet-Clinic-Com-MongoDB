const Tutor = require("../models/tutor");

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
