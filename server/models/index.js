//Import models
const School = require('./School');
const Class = require('./Class');
const ClassAttendance = require('./ClassAttendance');
const ClassEvaluation = require('./ClassEvaluation');
const Student = require('./Student');
const Tutor = require('./Tutor');
const Professor = require('./Professor');

//Export models
module.exports = { School, Class, ClassAttendance, ClassEvaluation, Student, Tutor, Professor };
