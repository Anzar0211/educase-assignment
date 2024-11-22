const { body, query } = require("express-validator");

const validateSchool = [
  body("name")
    .notEmpty()
    .trim()
    .escape()
    .withMessage("School name is required"),
  body("address").notEmpty().trim().withMessage("Address is required"),
  body("latitude")
    .isFloat({ min: -90, max: 90 })
    .withMessage("Valid latitude is required (-90 to 90)"),
  body("longitude")
    .isFloat({ min: -180, max: 180 })
    .withMessage("Valid longitude is required (-180 to 180)"),
];

const validateLocation = [
  query("latitude")
    .isFloat({ min: -90, max: 90 })
    .withMessage("Valid latitude is required (-90 to 90)"),
  query("longitude")
    .isFloat({ min: -180, max: 180 })
    .withMessage("Valid longitude is required (-180 to 180)"),
];

module.exports = {
  validateSchool,
  validateLocation,
};
