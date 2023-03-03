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