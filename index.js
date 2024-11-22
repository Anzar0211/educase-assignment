// index.js
const express = require("express");
const bodyParser = require("body-parser");
const { body, validationResult, query } = require("express-validator");
const schoolController = require("./queryControllers");

const app = express();
app.use(bodyParser.json());

// Validation middleware 
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

// Add School API
app.post("/addSchool", validateSchool, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const result = await schoolController.addSchool(req.body);

    res.status(201).json({
      message: "School added successfully",
      schoolId: result.insertId,
    });
  } catch (error) {
    console.error("Error in addSchool endpoint:", error);
    res.status(500).json({ error: "Failed to add school" });
  }
});

const validateLocation = [
  query("latitude")
    .isFloat({ min: -90, max: 90 })
    .withMessage("Valid latitude is required (-90 to 90)"),
  query("longitude")
    .isFloat({ min: -180, max: 180 })
    .withMessage("Valid longitude is required (-180 to 180)"),
];

// List Schools API
app.get("/listSchools", validateLocation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const userLat = parseFloat(req.query.latitude);
    const userLon = parseFloat(req.query.longitude);

    const schools = await schoolController.getSchoolsByDistance(
      userLat,
      userLon
    );

    res.json({
      schools: schools.map((school) => ({
        id: school.id,
        name: school.name,
        address: school.address,
        latitude: school.latitude,
        longitude: school.longitude,
        distance: parseFloat(school.distance.toFixed(2)), // Distance in kilometers
      })),
    });
  } catch (error) {
    console.error("Error in listSchools endpoint:", error);
    res.status(500).json({ error: "Failed to fetch schools" });
  }
});

// Get all schools 
app.get("/schools", async (req, res) => {
  try {
    const schools = await schoolController.getSchools();
    res.json({ schools });
  } catch (error) {
    console.error("Error fetching all schools:", error);
    res.status(500).json({ error: "Failed to fetch schools" });
  }
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
