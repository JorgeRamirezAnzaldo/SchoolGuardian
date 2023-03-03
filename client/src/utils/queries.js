//Import gql from @apollo/client
import { gql } from '@apollo/client';

//Export QUERY_ME
export const QUERY_ME = gql`
  query me {
    me {
        _id
        username
        email
        password
        name
        telephone
    }
  }`;

export const QUERY_TUTOR = gql`
  query Tutor($id: ID!) {
    tutor(_id: $id) {
        userId: {
            name
            telephone
            email
        }
        students:{
            name
            grade
            registration
            school{
                name
            }
       }
    }
  }`;

export const QUERY_STUDENT = gql`
  query Student($id: ID!) {
    student(_id: $id) {
        _id
        name
        grade
        registration
        classes:{
            classId
            name
            grade
            professor:{
                name
            }
            hour
        }
        tutor: {
            userId
        }
        school: {
            name
        }
        alerts: {
            subject
            message
            from:{
                professor:{
                    name
                }
            }
            sign
        }
    }
  }`;

export const QUERY_STUDATT = gql`
  query StudentAttendance($id: ID!, $classId: ID!) {
    studentAttendance(_id: $id, class_id: $classId) {
        classId:{
            name
            grade
            hour
        }
        attendanceDate
        attended
        studentId:{
            name
            grade
            registration
        }
    }
  }`;

export const QUERY_STUDEVAL = gql`
  query StudentEvaluation($id: ID!, $classId: ID!) {
    studentEvaluation(_id: $id, class_id: $classId) {
        classId:{
            name
            grade
            hour
        }
        evaluationDate
        score
        studentId:{
            name
            grade
            registration
        }
    }
  }`;