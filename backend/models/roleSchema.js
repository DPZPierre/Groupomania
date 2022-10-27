const mongoose = require("mongoose");


const role = mongoose.Schema({
    type: {
        type: String,
        enum: ["admin", "user"],
        default: "user",
    }, 
    permission: [{
        type: String,
        lowercase: true,
        trim: true,
        enum:["read","write"],
        set() {
            if (this.type === "admin") return ["read", "write"]
            return ["read"]
        }
    }]
        
  })
  
  module.exports = mongoose.model('role', role);
  
