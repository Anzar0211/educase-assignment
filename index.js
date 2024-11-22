// index.js
const express = require("express");
const bodyParser = require("body-parser");

const schoolRoutes = require("./schoolRoutes");

const app = express();
app.use(bodyParser.json());


app.use('/api',schoolRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
