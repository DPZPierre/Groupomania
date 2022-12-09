const User = require("../models/User");
const ObjectID = require("mongoose").Types.ObjectId;

exports.getAllUsers = async (req, res) => {
    const users = await User.find().select("-password");
    res.status(200).json(users);
};
  
exports.userInfo = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  User.findById(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("ID unknown : " + err);
  }).select("-password");
};


exports.deleteUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id)) 
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await User.remove({ _id: req.params.id }).exec();
    res.status(200).json({ message: "Successfully deleted. " });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};