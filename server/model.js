const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: mongoose.SchemaTypes.String,
  age: mongoose.SchemaTypes.Number,
  city: mongoose.SchemaTypes.String,
});

const userModel = mongoose.model("users", userSchema);

const createOneUser = async (data) => {
  const result = await userModel.insertOne(data);
  return result;
};

const deleteOneUser = async (_id) => {
  const result = await userModel.deleteOne({ _id });
  return result;
};

const findAllUsers = async (query = {}) => {
  const users = await userModel.find(query);
  return users;
};

const findOneUser = async (query = {}) => {
  const user = await userModel.findOne(query);
  return user;
};

const updateOneUser = async (_id, body) => {
  const result = await userModel.findByIdAndUpdate(_id, body);
  return result;
};

module.exports = {
  createOneUser,
  deleteOneUser,
  findAllUsers,
  findOneUser,
  updateOneUser,
};
