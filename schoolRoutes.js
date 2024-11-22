const express = require("express");
const { addSchool,listSchools,fetchAllSchools } = require("./schoolControllers");
const { validateSchool, validateLocation } = require("./middleware");


const router = express.Router();

router.post('/addSchool',validateSchool,addSchool);
router.get('/listSchools',validateLocation,listSchools);
router.get('/schools',fetchAllSchools);

module.exports = router;
