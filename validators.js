const Joi = require("joi");

const userSchema = Joi.object({
  email: Joi.string().email().max(255).required(),
  firstname: Joi.string().max(255).required(),
  lastname: Joi.string().max(255).required(),
  city: Joi.string().max(255).optional(),
  language: Joi.string().max(255).optional(),
});

const validateUser = (req, res, next) => {
  const { firstname, lastname, email } = req.body;

  const { error } = userSchema.validate(
    { firstname, lastname, email },
    { abortEarly: false }
  );

  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    next();
  }
};

const movieSchema = Joi.object({
  title: Joi.string().max(255).required(),
  director: Joi.string().max(255).required(),
  year: Joi.string().max(255).required(),
  color: Joi.string().max(255).required(),
  duration: Joi.string().max(255).required(),
});

const validateMovie = (req, res, next) => {
  const { title, director, year, color, duration } = req.body;

  const { error } = movieSchema.validate(
    { title, director, year, color, duration },
    { abortEarly: false }
  );

  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    next();
  }
};

module.exports = {
  validateMovie,
  validateUser,
};

// const validateMovie = (req, res, next) => {
//   const { title, director, year, color, duration } = req.body;
//   const errors = [];
//   const emailRegex = /[a-z0-9._]+@[a-z0-9-]+\.[a-z]{2,3}/;

//   if (title == null) {
//     errors.push({ field: "title", message: "This field is required" });
//   } else if (title.length >= 255) {
//     errors.push({
//       field: "title",
//       message: "Your title has more than 255 characters, really?",
//     });
//   }
//   if (director == null) {
//     errors.push({ field: "director", message: "This field is required" });
//   }
//   if (year == null) {
//     errors.push({ field: "year", message: "This field is required" });
//   }
//   if (color == null) {
//     errors.push({ field: "color", message: "This field is required" });
//   }
//   if (duration == null) {
//     errors.push({ field: "duration", message: "This field is required" });
//   }
//   if (errors.length) {
//     res.status(422).json({ validationErrors: errors });
//   } else {
//     next();
//   }
// };

// const validateUser = (req, res, next) => {
//   const { firstname, lastname, email, city, language } = req.body;
//   const errors = [];
//   const emailRegex = /[a-z0-9._]+@[a-z0-9-]+\.[a-z]{2,3}/;

//   if (firstname == null) {
//     errors.push({ field: "firstname", message: "This field is required" });
//   }
//   if (lastname == null) {
//     errors.push({ field: "lastname", message: "This field is required" });
//   } else if (lastname.length >= 255) {
//     errors.push({
//       field: "lastname",
//       message: "Your lastname has more than 255 character, are you kidding?",
//     });
//   }
//   if (!emailRegex.test(email)) {
//     errors.push({ field: "email", message: "This field is required" });
//   }
//   if (errors.length) {
//     res.status(422).json({ validationErrors: errors });
//   } else {
//     next();
//   }
// };

// module.exports = {
//   validateMovie,
//   validateUser,
// };
