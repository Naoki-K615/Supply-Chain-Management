const express = require("express");
const cors = require("cors");
const passport = require("passport");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const logger = require("./utils/logger");
const medicineRoutes = require("./routes/medicineRoutes");
const participantRoutes = require("./routes/participantRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const shipmentRoutes = require("./routes/shipmentRoutes");

dotenv.config();

const app = express();

// Try to connect to MongoDB, but don't fail if it's not available
connectDB().catch(err => {
  console.log("MongoDB not available - running in demo mode");
});


app.use(cors({
  origin: "http://localhost:3000", // frontend origin
  methods: ["GET", "DELETE", "PUT", "POST"],
  credentials: true
}));


app.use(express.json());
app.use(logger.logRequest);
app.use("/api/medicines", medicineRoutes);
app.use("/api/participants", participantRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/shipments", shipmentRoutes);

//use passport
app.use(passport.initialize());
//use passport middlware




app.get("/", (req, res) => {
  res.send("Supply Chain Management API Running...");
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));