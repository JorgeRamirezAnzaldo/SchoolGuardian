const { Schema, model } = require('mongoose');

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


const Tutor = model('Tutor', tutorSchema);

module.exports = Tutor;