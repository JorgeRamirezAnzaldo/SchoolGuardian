const { Schema, model } = require('mongoose');
const Class = require('./Class');

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

const Student = model('Student', studentSchema);

module.exports = Student;