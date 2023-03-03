const { AuthenticationError } = require('apollo-server-express');
const { Tutor, Student, ClassAttendance, ClassEvaluation, User, Alert } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
      user: async (parent, { email }) => {
        //if (context.user) { //If user context is available
          return User.findOne({ email });
        //}
        //throw new AuthenticationError('You need to be logged in!'); //If there is no context send Authentication Error
      },
      me: async (parent, args, context) => {
        //if (context.user) { //If user context is available
          return User.findOne({ _id: context.user._id }); //Return proper user using the context
        //}
        //throw new AuthenticationError('You need to be logged in!'); //If there is no context send Authentication Error
      },
      tutor: async (parent, { _id }) => {
        //if (context.user) { //If user context is available
          return Tutor.findOne({"userId" :  _id }).populate('students').populate({
            path: 'userId',
            model: 'User'
          });
        //}
        //throw new AuthenticationError('You need to be logged in!'); //If there is no context send Authentication Error
      },
      student: async (parent, { _id }) => {
        //if (context.user) { //If user context is available
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
                  model: 'Alert',
                  populate:  {
                    path: 'from',
                    model: 'Professor',
                    populate: 'userId'
                  }
              },
          ])
        //}
        //throw new AuthenticationError('You need to be logged in!'); //If there is no context send Authentication Error
      },
      studentAttendance: async (parent, { _id, class_id}) => {
        //if (context.user) { //If user context is available
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
        //}
        //throw new AuthenticationError('You need to be logged in!'); //If there is no context send Authentication Error
      },
      studentEvaluation: async (parent, { _id, class_id }) => {
        //if (context.user) { //If user context is available
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
        //}
        //throw new AuthenticationError('You need to be logged in!'); //If there is no context send Authentication Error
      },
    },

    Mutation: {

      //Define method to login
      login: async (parent, { email, password }) => {
        const user = await User.findOne({ email }); //Find an user using its email

        if (!user) { //If no user was found
          throw new AuthenticationError('No user found with this email address'); //Send Authentication Error
        }

        const correctPw = await user.isCorrectPassword(password); //Validate if the password is correct

        if (!correctPw) { //If the password is not correct
          throw new AuthenticationError('Incorrect credentials'); //Send Authentication Error
        }

        const token = signToken(user); //Sign token using the user that is logging in
        return { token, user }; //Return token and user
      },

      signAlert: async (parent, { _id, sign }) => {
        //if (context.user) { //If user context is available
          const alert = await Alert.findOneAndUpdate( { _id: _id }, {sign: sign}, {new: true});
          return alert;
        //}
        //throw new AuthenticationError('You need to be logged in!'); //Return Authentication Error if there is no context available
      }

    }

}

module.exports = resolvers;