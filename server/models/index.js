//Import models
const School = require('./School');
const Class = require('./Class');
const ClassAttendance = require('./ClassAttendance');
const StudentAttendance = require('./StudentAttendance');
const ClassEvaluation = require('./ClassEvaluation');
const StudentEvaluation = require('./StudentEvaluation');
const Student = require('./Student');
const Tutor = require('./Tutor');
const Professor = require('./Professor');

//Export models
module.exports = { School, Class, ClassAttendance, StudentAttendance, ClassEvaluation,
                   StudentEvaluation, Student, Tutor, Professor };
