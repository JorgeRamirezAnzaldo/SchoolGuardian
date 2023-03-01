const { Schema, model } = require('mongoose');

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

const ClassAttendance = model('ClassAttendance', classAttendanceSchema);

module.exports = ClassAttendance;