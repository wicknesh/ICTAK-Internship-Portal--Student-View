const mongoose = require("mongoose");
const examSchema = new mongoose.Schema({
    email: String,
    mark: Number,
});

const examModel = mongoose.model('examscore', examSchema);
module.exports = examModel;
