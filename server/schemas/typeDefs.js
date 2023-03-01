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
  }

  type Professor {
    _id: ID
    userId: User
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
    tutor (_id: ID!): Tutor
    student (_id: ID!): Student
    studentAttendance (_id: ID!, class_id: ID!): [ClassAttendance]
    studentEvaluation (_id: ID!, class_id: ID!): [ClassEvaluation]


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
    # me: User
  }
 


`;

module.exports = typeDefs;