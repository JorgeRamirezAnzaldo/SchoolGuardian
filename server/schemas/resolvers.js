const { AuthenticationError } = require('apollo-server-express');
const { Tutor, Student, ClassAttendance, ClassEvaluation, User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
      user: async (parent, { email }) => {
        return User.findOne({ email });
      },
      tutor: async (parent, { _id }) => {
        return Tutor.findOne({"userId" :  _id }).populate('students').populate({
          path: 'userId',
          model: 'User'
      });
      },
      student: async (parent, { _id }) => {
        return Student.findOne({ _id }).populate([
            {
                path: 'classes',
                model: 'Class',
                populate: 'professor'
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
      studentAttendance: async (parent, { _id, class_id}) => {
        return ClassAttendance.find()
        .where("studentId").equals(_id)
        .where("classId").equals(class_id)
        .populate({
            path: 'classId',
            model: 'Class'
        }).populate({
            path: 'studentId',
            model: 'Student'
        });
      },
      studentEvaluation: async (parent, { _id, class_id }) => {
        return ClassEvaluation.find()
        .where("studentId").equals(_id)
        .where("classId").equals(class_id)
        .populate({
            path: 'classId',
            model: 'Class'
        }).populate({
          path: 'studentId',
          model: 'Student'
      });
      },
    },

}

module.exports = resolvers;