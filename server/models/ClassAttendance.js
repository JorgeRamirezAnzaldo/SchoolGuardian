//Import Schema and model from mongoose
const { Schema, model } = require('mongoose');

//Create classAttendanceSchema with proper fields
const classAttendanceSchema = new Schema({
    classId: {
        type: Schema.Types.ObjectId, 
        ref: "Class",
        required: true
    },
    attendanceDate: {
        type: String,
        required: true,
    },
    studentId: {
        type: Schema.Types.ObjectId, 
        ref: "Student",
        required:true
    },
    attended: {
        type: Boolean,
        required: true
    }
})

//Create ClassAttendance model using the classAttendanceSchema
const ClassAttendance = model('ClassAttendance', classAttendanceSchema);

//Export ClassAttendance model
module.exports = ClassAttendance;