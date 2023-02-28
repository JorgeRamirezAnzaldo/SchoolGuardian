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
    professor: Professor!
    hour: String!
    students: [Student]
  }

  type StudentAttendance {
    _id: ID
    studentId: Student!
    attended: Boolean!
  }

  type StudentEvaluation {
    _id: ID
    studentId: Student!
    score: Float!
  }

  type ClassAttendance {
    _id: ID
    classId: Class!
    attendanceDate: String!
    studentAttendances: [StudentAttendance]
  }

  type ClassEvaluation {
    _id: ID
    classId: Class!
    evaluationDate: String!
    studentEvaluations: [StudentEvaluation]
  }

  type Professor {
    _id : ID
    name: String!
    telephone: String!
    email: String!
    password: String!
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
  }


  type Tutor {
    _id: ID
    name: String!
    telephone: String!
    email: String!
    password: String!
    students: [Student]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    students: [Student]
    classes: [Class]
    schools: [School]
    professors: [Professor]
    classAttendances(classId: ID!): [ClassAttendance]
    classEvaluations(classId: ID!): [ClassEvaluation]
    classAttendance(classId: ID!, attendanceDate: Date!): ClassAttendance
    classEvaluation(classId: ID!, evaluationDate: Date!): ClassEvaluation
    tutor (email: String!): Tutor
    professor (email: String!): Professor
    student (registration: String!): Student
    me: User
  }

  input ClassAttendanceInput: {
    classId: ID!
    attendanceDate: Date!
    studentAttendances: [StudentAttendance]
  }

  input ClassEvaluationInput: {
    classId: ID!
    evaluationDate: Date!
    studentEvaluations: [StudentEvaluation]
  }
 

  type Mutation {
    addSchool(name: String!, principal: ID): School
    addClass(name: String!, grade: Int!, professor: ID, hour: String!): Class
    addStudent(name: String!, grade: Int!, registration: String!): Student
    addProfessor(name: String!, telephone: String!, email: String!, password: String!): Auth
    addTutor(name: String!, telephone: String!, email: String!, password: String!): Auth
    addClassAttendance(input: ClassAttendanceInput): ClassAttendance
    addClassEvaluation(input: ClassEvaluationInput): ClassEvaluation
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;