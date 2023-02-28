const { Schema, model } = require('mongoose');
const StudentAttendance = require('./StudentAttendance');

const classAttendanceSchema = new Schema({
    classId: {
        type: Schema.Types.ObjectId, 
        ref: "Class",
        required: true
    },
    attendanceDate: {
        type: Date,
        required: true,
    },
    //studentAttendances: [StudentAttendance]
    studentAttendances: [{
        studentId: {
            type: Schema.Types.ObjectId, 
            ref: "Student",
            required:true
        },
        attended: {
            type: Boolean,
            required: true
        }
    }]
})

const ClassAttendance = model('ClassAttendance', classAttendanceSchema);

module.exports = ClassAttendance;