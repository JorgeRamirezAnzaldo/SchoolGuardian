//Import Schema and model from mongoose
const { Schema, model } = require('mongoose');

//Create tutorSchema with proper fields
const tutorSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    students: [{
        type: Schema.Types.ObjectId,
        ref: "Student"
    }]
})

//Create Tutor model using the tutorSchema
const Tutor = model('Tutor', tutorSchema);

//Export Tutor model
module.exports = Tutor;