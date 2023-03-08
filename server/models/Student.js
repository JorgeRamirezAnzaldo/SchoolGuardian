//Import Schema and model from mongoose
const { Schema, model } = require('mongoose');

//Create studentSchema with proper fields
const studentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    grade: {
        type: Number,
        required: true
    },
    registration: {
        type: String,
        required: true
    },
    classes: [{                          
        type: Schema.Types.ObjectId,
        ref: "Class"
    }],
    tutor: {
        type: Schema.Types.ObjectId,
        ref: "Tutor",
    },
    school: {
        type: Schema.Types.ObjectId,
        ref: "School",
    },
    alerts: [{
        type: Schema.Types.ObjectId,
        ref: "Alert"
    }]
})

//Create Student model using the studentSchema
const Student = model('Student', studentSchema);

//Export Student model
module.exports = Student;