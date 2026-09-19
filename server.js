const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const Case = require("./models/Case");
const Evidence = require("./models/Evidence");
const app = express();
const PORT = 3000;
app.use(cors());
app.use(express.json());
// Serve frontend
app.use(express.static(__dirname));
// ===============================
// TEST API
// ===============================
app.get("/api/status", (req, res) => {
res.json({
status: "online",
message: "Trace Forensic backend is running",
database: mongoose.connection.readyState === 1
? "connected"
: "disconnected"
});
});
// ===============================
// GET ALL CASES
// ===============================
app.get("/api/cases", async (req, res) => {
try {
const cases = await Case.find();
res.json(cases);
} catch (error) {
    res.status(500).json({
        message: "Failed to fetch cases",
        error: error.message
    });
}
});
// ===============================
// CREATE NEW CASE
// ===============================
app.post("/api/cases", async (req, res) => {
try {
const newCase = new Case(req.body);
const savedCase = await newCase.save();
    res.status(201).json(savedCase);

} catch (error) {
    res.status(500).json({
        message: "Failed to create case",
        error: error.message
    });
}
});
// ===============================
// CREATE NEW EVIDENCE
// ===============================
app.post("/api/evidence", async (req, res) => {
try {
const newEvidence = new Evidence(req.body);
    const savedEvidence = await newEvidence.save();

    res.status(201).json(savedEvidence);

} catch (error) {
    res.status(500).json({
        message: "Failed to create evidence",
        error: error.message
    });
}
});
// ===============================
// GET EVIDENCE FOR A CASE
// ===============================
app.get("/api/evidence/:caseId", async (req, res) => {
try {
const evidence = await Evidence.find({
caseId: req.params.caseId
});
    res.json(evidence);

} catch (error) {
    res.status(500).json({
        message: "Failed to fetch evidence",
        error: error.message
    });
}
});
// ===============================
// START SERVER + MONGODB
// ===============================
async function startServer() {
try {

    console.log("Trying to connect to MongoDB...");

    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ MongoDB connected successfully");

    app.listen(PORT, () => {
        console.log(
            `🚀 Trace Forensic server running at http://localhost:${PORT}`
        );
    });

} catch (error) {

    console.error("❌ MongoDB connection failed:");
    console.error(error.message);

}
}
startServer();