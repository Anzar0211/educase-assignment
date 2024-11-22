
const pool = require("./dbCon");

class SchoolController {
  // Get all schools
  async getSchools() {
    try {
      const [rows] = await pool.query("SELECT * FROM schools");
      return rows;
    } catch (error) {
      console.error("Error fetching schools:", error);
      throw error;
    }
  }

  // Add a new school
  async addSchool(school) {
    try {
      const [result] = await pool.query(
        "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)",
        [school.name, school.address, school.latitude, school.longitude]
      );
      return result;
    } catch (error) {
      console.error("Error adding school:", error);
      throw error;
    }
  }

  // Get schools sorted by distance from a point
  async getSchoolsByDistance(userLat, userLon) {
    try {
      const query = `
                SELECT 
                    *,
                    (
                        6371 * acos(
                            cos(radians(?)) * 
                            cos(radians(latitude)) * 
                            cos(radians(longitude) - radians(?)) + 
                            sin(radians(?)) * 
                            sin(radians(latitude))
                        )
                    ) AS distance
                FROM schools
                ORDER BY distance
            `;
      const [rows] = await pool.query(query, [userLat, userLon, userLat]);
      return rows;
    } catch (error) {
      console.error("Error fetching schools by distance:", error);
      throw error;
    }
  }
}


module.exports = new SchoolController();
