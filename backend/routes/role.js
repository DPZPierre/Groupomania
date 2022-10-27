const express = require('express');
const router = express.Router();
const roleCtrllr = require("../controllers/role")

router.get('/', roleCtrllr.fetchRoles)

module.exports = router;