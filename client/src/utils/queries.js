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
        usertype
    }
  }`;

export const QUERY_TUTOR = gql`
  query Tutor($userId: ID!) {
    tutor(userId: $userId) {
      _id
      userId {
        name
        telephone
        email
      }
      students {
        _id
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
  query Student($_id: ID!) {
    student(_id: $_id) {
        _id
        name
        grade
        registration
        classes {
          _id
          name
          grade
          professor {
            principal 
          }
          hour
        }
        tutor {
          _id
          userId{
            name
          }
        }
        school {
          name
        }
        alerts {
          _id
          subject
          message
          from{
            principal
            userId{
              name
            }
          }
          sign
        }
    }
  }`;

  export const QUERY_STUDATT = gql`
  query StudentAttendance($id: ID!) {
    studentAttendance(_id: $id) {
        classId {
            _id
            name
            grade
            hour
        }
        attendanceDate
        attended
        studentId {
            name
            grade
            registration
        }
    }
  }`;

export const QUERY_STUDEVAL = gql`
  query StudentEvaluation($id: ID!) {
    studentEvaluation(_id: $id) {
        _id
        classId {
            _id
            name
            grade
            hour
        }
        evaluationDate
        score
        studentId {
            name
            grade
            registration
        }
    }
  }`;

export const QUERY_PROFESSOR = gql`
  query Professor($userId: ID!) {
    professor(userId: $userId) {
      _id
      principal
      schoolId {
        _id
        name
      }
      userId {
        name
        usertype
      }
      classes{
        _id
        name
        grade
        hour
      }
    }
  }
`;

export const QUERY_STUDENTS = gql`
query Students($school: ID!) {
  students(school: $school) {
    _id
    name
    registration
  }
}`;

export const QUERY_CLASS = gql`
  query Class($_id: ID!) {
    class(_id: $_id) {
      name
      students {
        name
        registration
      }
    }
  }
`;