const argon2 = require("argon2");

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  parallelism: 1,
  timeCost: 5,
};

//below
//OWASP recommends the following configuration for Argon2 : "Use Argon2id with a minimum configuration of 15 MiB of memory, an iteration count of 2, and 1 degree of parallelism".
// the password is hashed from req.body.password.
//Once we have the hash, console.log() it for testing.
//hashed password stored in req.body.hashedPassword.
//To ensure the plain password can't be used after your middleware, delete it.
const hashPassword = (req, res, next) => {
  console.log(req.body.password);
  argon2
    .hash(req.body.password, hashingOptions)
    .then((hashedPassword) => {
      console.log(hashedPassword);

      req.body.hashedPassword = hashedPassword;
      delete req.body.password;

      next();
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = { hashPassword };
