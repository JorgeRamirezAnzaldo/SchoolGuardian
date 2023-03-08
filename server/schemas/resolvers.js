//Import AuthenticationError 
const { AuthenticationError } = require('apollo-server-express');
//Import Models
const { Tutor, Student, ClassAttendance, ClassEvaluation, User, Alert, Professor, Class } = require('../models');
//Import signToken from authorization utilities
const { signToken } = require('../utils/auth');

//Define resolvers
const resolvers = {
    //Query resolvers
    Query: {
      //Find user by email
      user: async (parent, { email }, context) => {
        if (context.user) { //If user context is available
          return User.findOne({ email });
        }
        throw new AuthenticationError('You need to be logged in!'); //If there is no context send Authentication Error
      },
      //Me query, find user using the context
      me: async (parent, args, context) => {
        if (context.user) { //If user context is available
          return User.findOne({ _id: context.user._id }); //Return proper user using the context
        }
        throw new AuthenticationError('You need to be logged in!'); //If there is no context send Authentication Error
      },
      //Find Tutor using its userId and populate the necessary data
      tutor: async (parent, { userId }, context) => {
        if (context.user) { //If user context is available
          return Tutor.findOne({userId :  userId }).populate({
            path: 'students',
            model: 'Student',
            populate: 'school'
        }, ).populate({
            path: 'userId',
            model: 'User'
          });
        }
        throw new AuthenticationError('You need to be logged in!'); //If there is no context send Authentication Error
      },
      //Find Professor using its userId and populate the necessary data
      professor: async(parent, { userId }, context) => {
        if (context.user) { //If user context is available
          return Professor.findOne({userId :  userId }).populate({
            path: 'userId',
            model: 'User',
        }, ).populate({
            path: 'schoolId',
            model: 'School'
          }).populate({
            path: 'classes',
            model: 'Class'
          });
        }
        throw new AuthenticationError('You need to be logged in!'); //If there is no context send Authentication Error
      },
      //Find Class using its id and populate the necessary data
      class: async(parent, { _id }, context) => {
        if (context.user) { //If user context is available
          return Class.findOne({ _id: _id }).populate(
            {
              path: 'students',
              model: 'Student'
            }
          );
        }
        throw new AuthenticationError('You need to be logged in!'); //If there is no context send Authentication Error
      },
      //Find Students using the school
      students: async(parent, {school}, context) => {
        if (context.user) { //If user context is available
          return Student.find()
          .where("school").equals(school);
        }
        throw new AuthenticationError('You need to be logged in!'); //If there is no context send Authentication Error
      },
      //Find Students using its id and populate the necessary data
      student: async (parent, { _id }, context) => {
        if (context.user) { //If user context is available
          const student=await Student.findOne({ _id }).populate(
              {
                  path: 'classes',
                  model: 'Class',
                  populate: 'professor'
              }) 
              .populate( 
              {
                  path: 'tutor',
                  model: 'Tutor',
                  populate: 'userId'

              }).populate(
              {
                  path: 'school',
                  model: 'School'
              }).populate( 
              {
                  path: 'alerts',
                  model: 'Alert',
                  populate:  {
                    path: 'from',
                    model: 'Professor',
                    populate: 'userId'
                  }
              })
              return student;
        }
        throw new AuthenticationError('You need to be logged in!'); //If there is no context send Authentication Error
      },
      //Find StudentAttendances using the studentId and populate necessary data
      studentAttendance: async (parent, { _id}, context) => {
        if (context.user) { //If user context is available
          return ClassAttendance.find()
          .where("studentId").equals(_id)
          //.where("classId").equals(class_id)
          .populate({
              path: 'classId',
              model: 'Class'
          }).populate({
              path: 'studentId',
              model: 'Student'
          });
        }
        throw new AuthenticationError('You need to be logged in!'); //If there is no context send Authentication Error
      },
      //Find StudentEvaluations using the studentId and populate necessary data
      studentEvaluation: async (parent, { _id }, context) => {
        if (context.user) { //If user context is available
          return ClassEvaluation.find()
          .where("studentId").equals(_id)
          //.where("classId").equals(class_id)
          .populate({
              path: 'classId',
              model: 'Class'
          }).populate({
            path: 'studentId',
            model: 'Student'
          });
        }
        throw new AuthenticationError('You need to be logged in!'); //If there is no context send Authentication Error
      },
    },
    //Define Mutation resolvers
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
      //Define method to sign an alert
      signAlert: async (parent, { _id, sign }, context) => {
        if (context.user) { //If user context is available
          const alert = await Alert.findOneAndUpdate( { _id: _id }, {sign: sign}, {new: true}); //Find the alert using its id and change the sign value to true
          return alert;
        }
        throw new AuthenticationError('You need to be logged in!'); //Return Authentication Error if there is no context available
      },
      //Define method to create an alert
      createAlert: async (parent, {subject, message, from, sign}, context ) => {
        if (context.user) { //If user context is available
          const alert = await Alert.create( {subject: subject , message: message, from: from, sign: sign} ); //Create a new alert using all the necessary data
          return alert;
        }
        throw new AuthenticationError('You need to be logged in!'); //Return Authentication Error if there is no context available
      },
      //Define method to assign an alert
      assignAlert: async (parent, { alertId, studentId }, context) => {
        if (context.user) { //If user context is available
          const student = await Student.findOneAndUpdate( { _id: studentId }, {$addToSet:{alerts:{_id: alertId}}}, {new: true}); //Find student by its id and add the alert to the alerts set of the student
          return student;
        }
        throw new AuthenticationError('You need to be logged in!'); //Return Authentication Error if there is no context available
      },
      //Define method to delete a student
      deleteStudent: async (parent, { _id }, context) => {
        if (context.user) { //If user context is available
          const student = await Student.findOneAndDelete({ _id: _id }); //Find student by its id and delete it
          return student;
        }
        throw new AuthenticationError('You need to be logged in!'); //Return Authentication Error if there is no context available
      }

    }

}

//Export all resolvers
module.exports = resolvers;