const { gql } = require('apollo-server-express');

const typeDefs = gql`

  type School {
    _id: ID
    name: String!
    principal: Professor
    classes: [Class]
  }

  type Class {
    _id : ID
    name: String!
    grade: Int!
    professor: Professor
    hour: String!
    students: [Student]
  }

  type ClassAttendance {
    _id: ID
    classId: Class!
    attendanceDate: String!
    studentId: Student!
    attended: Boolean!
  }

  type ClassEvaluation {
    _id: ID
    classId: Class!
    evaluationDate: String!
    studentId: Student!
    score: Float!
  }

  type User {
    _id: ID
    username: String!
    email: String!
    password: String!
    name: String!
    telephone: String!
    usertype: String!
  }

  type Professor {
    _id: ID
    userId: User
    schoolId: School
    principal: Boolean
    classes: [Class]
  }

  type Student {
    _id: ID
    name: String!
    grade: Int!
    registration: String!
    classes: [Class]
    tutor: Tutor
    school: School
    alerts: [Alert]
  }

  type Tutor {
    _id: ID
    userId: User
    students: [Student]
  }

  type Alert {
    _id: ID
    subject: String!
    message: String!
    from: Professor!
    sign: Boolean!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    user (email: String!): User
    tutor (userId: ID!): Tutor
    professor (userId: ID!): Professor
    students (school: ID!): [Student]
    student (_id: ID!): Student
    studentAttendance (_id: ID!): [ClassAttendance]
    studentEvaluation (_id: ID!): [ClassEvaluation]
    me: User

    # students: [Student]
    # classes: [Class]
    # schools: [School]
    # professors: [Professor]
    # classAttendances(classId: ID!): [ClassAttendance]
    # classEvaluations(classId: ID!): [ClassEvaluation]
    # classAttendance(classId: ID!, attendanceDate: String!): ClassAttendance
    # classEvaluation(classId: ID!, evaluationDate: String!): ClassEvaluation
    # professor (email: String!): Professor
    # student (registration: String!): Student
  }

  type Mutation{
    login (email: String!, password: String!): Auth
    signAlert(_id: ID!, sign: Boolean!): Alert
    createAlert(subject: String!, message: String!, from: ID!, sign: Boolean!): Alert
    assignAlert(alertId: ID!, studentId: ID!): Student
  }
 
`;

module.exports = typeDefs;