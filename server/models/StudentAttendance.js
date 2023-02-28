const { Schema, model } = require('mongoose');

const studentAttendanceSchema = new Schema({
    studentId: {
        type: Schema.Types.ObjectId, 
        required:true
    },
    attended: {
        type: Boolean,
        required: true
    }
})

const StudentAttendance = model('StudentAttendance', studentAttendanceSchema);

module.exports = StudentAttendance;