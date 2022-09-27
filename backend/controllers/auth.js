const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        email: req.body.email,
        password: hash,
      });
      user
        .save()
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.login = async (req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).send({ error: "User unknown" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).send({ error: "Invalid password" });
          } else {
            const maxAge = 3 * 24 * 60 * 60 * 1000;
            const token = jwt.sign({ id: user.id }, "RANDOM_TOKEN_SECRET", {
              expiresIn: maxAge,
            });
            res.cookie("jwt", token, {
              maxAge,
              httpOnly: true,
            });
            console.log("Cookie created");
            return res.status(200).json({
              user: user.id,
            });
          }
        })
        .catch((error) => res.status(500).send({ error: "Error: " + error }));
    })
    .catch((error) => res.status(500).json({ error: "Error: " + error }));
};

exports.logout = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/');
}

