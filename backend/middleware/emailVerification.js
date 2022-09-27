module.exports = (req, res, next) => {
    const emailVerification = (email) => {
        let emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
        let validEmail = emailRegex.test(email)
        if(!validEmail) {
            res.status(400).json({ message: "L'adresse email n'est pas valide" });
        }
        else {
            next();
        }
    }
    emailVerification(req.body.email)
  };