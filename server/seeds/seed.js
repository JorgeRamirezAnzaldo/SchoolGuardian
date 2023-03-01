const db = require('../config/connection');
const { School, Class, Professor, Student, Tutor, ClassAttendance, ClassEvaluation } = require('../models');


const schoolData = require('./schoolData.json');
const professorData = require('./professorData.json');
const classDataOxford = require('./classData.json');
const classDataBoston = require('./classData.json');
const studentDataOxford = require('./studentData.json');
const tutorDataOxford = require('./tutorData.json');

db.once('open', async () => {

  await School.deleteMany({});
  await Class.deleteMany({});
  await Professor.deleteMany({});
  await Student.deleteMany({});
  await Tutor.deleteMany({});
  await ClassAttendance.deleteMany({});
  await ClassEvaluation.deleteMany({});

  const schools = await School.insertMany(schoolData);
  const classesOxford = await Class.insertMany(classDataOxford);
  const classesBoston = await Class.insertMany(classDataBoston);
  const professors = await Professor.insertMany(professorData);
  const studentsOxford = await Student.insertMany(studentDataOxford);
  const tutorsOxford = await Tutor.insertMany(tutorDataOxford);

  for (newClass of classesOxford) {

    const schoolOxford = schools[0];
    schoolOxford.classes.push(newClass._id);
    await schoolOxford.save();

    newClass.professor = professors[2]._id;
    await newClass.save();

    professors[2].classes.push(newClass._id);
    await professors[2].save();

    for (newStudent of studentsOxford){
        newStudent.classes.push(newClass._id);
        await newStudent.save();
        
        newClass.students.push(newStudent._id);
        await newClass.save();
    }

  }

  for (newStudent of studentsOxford){
    newStudent.tutor = tutorsOxford[0]._id;
    await newStudent.save();

    tutorsOxford[0].students.push(newStudent._id);
    await tutorsOxford[0].save();
  }


  for (newClass of classesBoston) {

    const schoolBoston = schools[1];
    schoolBoston.classes.push(newClass._id);
    await schoolBoston.save();

    newClass.professor = professors[3]._id;
    await newClass.save();

    professors[3].classes.push(newClass._id);
    await professors[3].save();

  }

  const classAttendanceMath = new ClassAttendance({
    classId: classesOxford[0]._id,
    attendanceDate: 'Tuesday, February 28th, 2023',
    studentAttendances: [{studentId: studentsOxford[0]._id, attended: true},
                         {studentId: studentsOxford[1]._id, attended: false}
                        ]
  });
  await classAttendanceMath.save();

  const classEvaluationMath = new ClassEvaluation({
    classId: classesOxford[0]._id,
    evaluationDate: 'Tuesday, February 28th, 2023',
    studentEvaluations: [{studentId: studentsOxford[0]._id, score: 9.5},
                         {studentId: studentsOxford[1]._id, score: 8.0}
                        ]
  });
  await classEvaluationMath.save();

  console.log('all done!');
  process.exit(0);

});