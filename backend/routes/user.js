const express = require('express');
const router = express.Router();

const authCtrl = require('../controllers/auth');
const userCtrl = require('../controllers/user')
const password = require('../middleware/password');
const email= require('../middleware/emailVerification');

router.post('/signup', password, email, authCtrl.signup);
router.post('/login',  authCtrl.login);
router.get("/logout", authCtrl.logout);

router.get('/', userCtrl.getAllUsers);
router.get("/:id", userCtrl.userInfo);
router.delete("/:id", userCtrl.deleteUser);



module.exports = router;