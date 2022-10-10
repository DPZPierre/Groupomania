const mongoose = require("mongoose");




const userRoleSchema = mongoose.Schema({
    userRole: {
        type: String,
        enum: ["admin", "basic"],
        default: "basic",
        required: true,
    },  
  })
  
  module.exports = mongoose.model('userRoleSchema', userRoleSchema);
  
