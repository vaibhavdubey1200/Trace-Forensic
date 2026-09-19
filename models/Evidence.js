const mongoose = require("mongoose");

const evidenceSchema = new mongoose.Schema({
    evidenceId: {
        type: String,
        unique: true
    },

    caseId: {
        type: String,
        required: true
    },

    name: {
        type: String,
        required: true
    },

    type: String,

    description: String,

    hash: String,

    collectedBy: String,

    collectedAt: Date,

    location: String
});

module.exports = mongoose.model("Evidence", evidenceSchema);