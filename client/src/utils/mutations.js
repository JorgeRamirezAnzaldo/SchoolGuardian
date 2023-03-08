import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SIGN_ALERT = gql`
  mutation SignAlert($id: ID!, $sign: Boolean!) {
    signAlert(_id: $id, sign: $sign) {
      _id
      subject
      message
      sign
    }
  }
`;

export const CREATE_ALERT = gql`
  mutation CreateAlert($subject: String!, $message: String!, $from: ID!, $sign: Boolean!) {
    createAlert(subject: $subject, message: $message, from: $from, sign: $sign) {
      _id
    }
  }
`;

export const ASSIGN_ALERT = gql `
  mutation AssignAlert($alertId: ID!, $studentId: ID!) {
    assignAlert(alertId: $alertId, studentId: $studentId) {
      _id
      name
    }
  }
`;

export const DELETE_STUDENT = gql `
  mutation DeleteStudent($_id: ID!) {
    deleteStudent(_id: $_id) {
      _id
      name
    }
  }
`;
