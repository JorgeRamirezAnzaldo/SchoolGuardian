const { AuthenticationError } = require('apollo-server-express');
const { Tutor, Student, ClassAttendance, ClassEvaluation } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
      tutor: async (parent, { email }) => {
        return Tutor.findOne({ email: email }).populate('students');
      },
      student: async (parent, { student_id }) => {
        return Student.findOne({ _id: student_id }).populate([
            {
                path: 'classes',
                model: 'Class'
            }, 
            {
                path: 'tutor',
                model: 'Tutor'
            },
            {
                path: 'school',
                model: 'School'
            },
            {
                path: 'alerts',
                model: 'Alert'
            },
        ]);
      },
      studentAttendance: async (parent, { student_id }) => {
        return ClassAttendance.find()
        .where("studentAttendances.studentId").equals(`${student_id}`)
        .populate({
            path: 'studentAttendances',
            model: 'StudentAttendance'
        })
      },
      studentEvaluation: async (parent, { student_id }) => {
        return ClassEvaluation.find()
        .where("studentEvaluations.studentId").equals(`${student_id}`)
        .populate({
            path: 'studentEvaluations',
            model: 'StudentEvaluation'
        })
      },
    },

    Mutation: {
    }
}

module.exports = resolvers;