const { body, validationResult, query } = require("express-validator");
const schoolController = require("./queryControllers");


const addSchool = async (req, res) => {
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
};

const listSchools = async (req, res) => {
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
};

const fetchAllSchools = async (req, res) => {
  try {
    const schools = await schoolController.getSchools();
    res.json({ schools });
  } catch (error) {
    console.error("Error fetching all schools:", error);
    res.status(500).json({ error: "Failed to fetch schools" });
  }
};

module.exports = {
  addSchool,
  listSchools,
  fetchAllSchools,
};