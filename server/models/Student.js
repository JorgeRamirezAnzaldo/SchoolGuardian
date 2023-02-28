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
    }
})

const Student = model('Student', studentSchema);

module.exports = Student;