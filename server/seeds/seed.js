const db = require('../config/connection');
const { School, Class, Professor, Student, Tutor, ClassAttendance, ClassEvaluation, User, Alert } = require('../models');


const schoolData = require('./schoolData.json');
const professorData = require('./professorData.json');
const classDataOxford = require('./classData.json');
const classDataBoston = require('./classData.json');
const studentDataOxford = require('./studentData.json');
const userData = require('./userData.json');
const alertData = require('./alertData.json');
//const tutorDataOxford = require('./tutorData.json');

db.once('open', async () => {

  await School.deleteMany({});
  await User.deleteMany({});
  await Class.deleteMany({});
  await Professor.deleteMany({});
  await Student.deleteMany({});
  await Tutor.deleteMany({});
  await ClassAttendance.deleteMany({});
  await ClassEvaluation.deleteMany({});
  await Alert.deleteMany({});

  const schools = await School.insertMany(schoolData);
  const users = await User.insertMany(userData);
  const classesOxford = await Class.insertMany(classDataOxford);
  const classesBoston = await Class.insertMany(classDataBoston);
  const professors = await Professor.insertMany(professorData);
  const studentsOxford = await Student.insertMany(studentDataOxford);
  const alerts = await Alert.insertMany(alertData);
  //const tutorsOxford = await Tutor.insertMany(tutorDataOxford);

  professors[0].userId = users[0]._id
  await professors[0].save();
  professors[1].userId = users[1]._id
  await professors[1].save();
  professors[2].userId = users[2]._id
  await professors[2].save();
  professors[3].userId = users[3]._id
  await professors[3].save();

  const tutorsOxford = new Tutor({
    userId: users[4]._id,
  })
  await tutorsOxford.save();

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
    newStudent.school = schools[0]._id;
    newStudent.tutor = tutorsOxford._id;
    await newStudent.save();

    tutorsOxford.students.push(newStudent._id);
    await tutorsOxford.save();
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

  const classAttendanceMath1 = new ClassAttendance({
    classId: classesOxford[0]._id,
    attendanceDate: 'Tuesday, February 28th, 2023',
    studentId: studentsOxford[0]._id, 
    attended: true,
  });
  await classAttendanceMath1.save();

  const classAttendanceMath2 = new ClassAttendance({
    classId: classesOxford[0]._id,
    attendanceDate: 'Tuesday, February 28th, 2023',
    studentId: studentsOxford[1]._id, 
    attended: true,
  });
  await classAttendanceMath2.save();

  const classEvaluationMath1 = new ClassEvaluation({
    classId: classesOxford[0]._id,
    evaluationDate: 'Tuesday, February 28th, 2023',
    studentId: studentsOxford[0]._id, 
    score: 9.5
  });
  await classEvaluationMath1.save();

  const classEvaluationMath2 = new ClassEvaluation({
    classId: classesOxford[0]._id,
    evaluationDate: 'Tuesday, February 28th, 2023',
    studentId: studentsOxford[1]._id, 
    score: 8.0
  });
  await classEvaluationMath2.save();

  const classAttendanceHistory = new ClassAttendance({
    classId: classesOxford[1]._id,
    attendanceDate: 'Tuesday, February 28th, 2023',
    studentId: studentsOxford[0]._id,
    attended: true
  });
  await classAttendanceHistory.save();

  for (alert of alerts){
    alert.from = professors[0]._id;
    await alert.save();
  }
  studentsOxford[0].alerts.push(alerts[0]._id);
  await studentsOxford[0].save();
  studentsOxford[1].alerts.push(alerts[1]._id);
  await studentsOxford[1].save();

  console.log('all done!');
  process.exit(0);

});