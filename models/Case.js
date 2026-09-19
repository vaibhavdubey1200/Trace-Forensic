const mongoose = require("mongoose");

const caseSchema = new mongoose.Schema({
    caseId: {
        type: String,
        unique: true
    },

    title: String,

    description: String,

    status: {
        type: String,
        default: "Open"
    },

    investigator: String,

    priority: {
        type: String,
        default: "Medium"
    }
});

module.exports = mongoose.model("Case", caseSchema);