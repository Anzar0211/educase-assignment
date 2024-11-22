# School Management System API

## Overview
A Node.js-based REST API system for managing school data with geolocation capabilities. This system allows users to add new schools and retrieve schools sorted by proximity to a specified location.

## Features
- Add new schools with location data
- List schools sorted by proximity to user location
- Geolocation-based distance calculation
- Input validation
- MySQL database integration

## Tech Stack
- Node.js
- Express.js
- MySQL(Local MySQL Instance/TiDB Cloud MySQL Server)
- Additional libraries:
  - express-validator (for input validation)
  - mysql2 (for database operations)
  - dotenv (for environment variables)

## Database Schema
```sql
CREATE TABLE schools (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    latitude FLOAT NOT NULL,
    longitude FLOAT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## API Endpoints

### 1. Fetch All Schools
- **Endpoint:** `/api/schools`
- **Method:** GET
- **hosted endpoint** `https://educase-assignment-rk5y.onrender.com/api/schools`
- **Respnse**
```json
{
  "schools": [
    {
      "id": 1,
      "name": "Test School",
      "address": "123 Test Street",
      "latitude": 40.7128,
      "longitude": -74.006,
      "created_at": "2024-11-22T04:57:45.000Z"
    },
    {
      "id": 2,
      "name": "SCHOOL1",
      "address": "21 Jump Street",
      "latitude": 40.7543,
      "longitude": -74.0024,
      "created_at": "2024-11-22T05:00:27.000Z"
    },
    {
      "id": 3,
      "name": "SCHOOL2",
      "address": "22 Jump Street",
      "latitude": 44.7543,
      "longitude": -70.0024,
      "created_at": "2024-11-22T05:00:42.000Z"
    },
    {
      "id": 4,
      "name": "Downtown Secondary",
      "address": "23 Jump Street",
      "latitude": 40.7139,
      "longitude": -73.984,
      "created_at": "2024-11-22T05:06:30.000Z"
    },
    {
      "id": 5,
      "name": "Senior Secondary",
      "address": "24 A Street",
      "latitude": 40.5462,
      "longitude": -77.984,
      "created_at": "2024-11-22T05:07:11.000Z"
    },
    {
      "id": 30001,
      "name": "ABC SCHOOL",
      "address": "24 B Street",
      "latitude": 40.5432,
      "longitude": -77.184,
      "created_at": "2024-11-22T06:17:14.000Z"
    }
  ]
}
```

### 2. Add School
- **Endpoint:** `/api/addSchool`
- **Method:** POST
- **Payload:**
- **hosted endpoint** `https://educase-assignment-rk5y.onrender.com/api/addSchool`
```json
{
    "name": "School Name",
    "address": "School Address",
    "latitude": 12.9716,
    "longitude": 77.5946
}
```
- **Response:**
```json
{
    "status": "success",
    "message": "School added successfully",
    "data": {
        "id": 1,
        "name": "School Name",
        "address": "School Address",
        "latitude": 12.9716,
        "longitude": 77.5946
    }
}
```

### 3. List Schools
- **Endpoint:** `/api/listSchools`
- **Method:** GET
- **Query Parameters:**
  - latitude (float)  
  - longitude (float)
- **Example Endpoint** `https://educase-assignment-rk5y.onrender.com/api/listSchools?latitude=40.7128&longitude=-74.0060`
- **Response:**
```json
{
  "schools": [
    {
      "id": 1,
      "name": "Test School",
      "address": "123 Test Street",
      "latitude": 40.7128,
      "longitude": -74.006,
      "distance": 0
    },
    {
      "id": 4,
      "name": "Downtown Secondary",
      "address": "23 Jump Street",
      "latitude": 40.7139,
      "longitude": -73.984,
      "distance": 1.86
    },
    {
      "id": 2,
      "name": "SCHOOL1",
      "address": "21 Jump Street",
      "latitude": 40.7543,
      "longitude": -74.0024,
      "distance": 4.62
    },
    {
      "id": 5,
      "name": "Senior Secondary",
      "address": "24 A Street",
      "latitude": 40.5462,
      "longitude": -77.984,
      "distance": 336.18
    },
    {
      "id": 3,
      "name": "SCHOOL2",
      "address": "22 Jump Street",
      "latitude": 44.7543,
      "longitude": -70.0024,
      "distance": 555.61
    }
  ]
}


```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MySQL (v5.7 or higher)
- npm or yarn

### Installation Steps
1. Clone the repository
```bash
git clone https://github.com/yourusername/school-management-api.git
```

2. Install dependencies
```bash
cd school-management-api
npm install
```

3. Configure environment variables
Create a `.env` file in the root directory:
```env


PORT=3000
MYSQL_HOST_NAME=localhost
MYSQL_USER=your_username
MYSQL_PASSWORD=your_password
DB_NAME=school_management
SSL_CERT="YOUR SSL Certificate string"  //Can be obtained from TiDB Cloud Server
```

4. Set up the database
```bash
# Run the MySQL scripts provided in the db/schema.sql file
mysql -u your_username -p school_management < db/schema.sql
```

5. Start the server
```bash
# Development mode
npm run dev

# Production mode
npm start
```

## Testing
### Using Postman
1. Import the provided Postman collection: `School_Management_API.postman_collection.json`
2. Update the environment variables in Postman if needed
3. Test the endpoints:
   - Add School API
   - List Schools API
   - Get All Schools

### Using curl
```bash
# Add a new school
curl -X POST http://localhost:3000/api/addSchool \
-H "Content-Type: application/json" \
-d '{"name":"Test School","address":"123 Test St","latitude":12.9716,"longitude":77.5946}'

# List schools near a location
curl "http://localhost:3000/api/listSchools?latitude=12.9716&longitude=77.5946"
```

## Deployment
The API is deployed on Render. Access the live version at:
```
https://educase-assignment-rk5y.onrender.com
```

## Error Handling
The API returns appropriate HTTP status codes and error messages:
- 400: Bad Request (invalid input)
- 404: Not Found
- 500: Internal Server Error

## Validation Rules
- School name: Required, string, max 255 characters
- Address: Required, string, max 255 characters
- Latitude: Required, float between -90 and 90
- Longitude: Required, float between -180 and 180

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



## Author
- Mohammad Anzar

## Support
For support, email: anzarkhan790@gmai.com

## Acknowledgments
- Express.js documentation
- MySQL documentation
- Geolocation calculation references
