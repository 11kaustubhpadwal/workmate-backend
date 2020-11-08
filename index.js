require("dotenv").config();

const express = require("express");
const connectDatabase = require("./db/connectToDb");
const cors = require("cors");

const app = express();

// CONNECT DATABASE
connectDatabase();

// ENABLE CORS
app.use(
  cors({
    origin: "*",
    methods: "GET,PATCH,POST",
    preflightContinue: true,
    optionsSuccessStatus: 204,
  })
);

// INITIALIZE MIDDLEWARE
app.use(express.json({ extended: false }));

// API ROUTES
app.use("/api/user", require("./routes/user"));
app.use("/api/save-job", require("./routes/saveJob"));
app.use("/api/unsave-job", require("./routes/unsaveJob"));

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}.`);
});
