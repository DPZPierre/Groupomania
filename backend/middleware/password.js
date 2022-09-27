const passwordSchema = require('../models/password');

module.exports = (req, res, next) => {
    if (!passwordSchema.validate(req.body.password)) {
        res.status(400).json({ message: 'Le mot de passe doit avoir au minimum 8 caractères, avec au moins une majuscule, une miniscule, un caractère spécial et un chiffre.' });
    } else {
        next();
    }
};