const role = require("../models/roleSchema");

exports.fetchRoles = async (req, res) => {
    try {
        const roles = await role.findOne({ type: "user" }).lean();
        return res.status(200).json({
            roles 
        })
    } catch (error) {
        throw error
    }
}