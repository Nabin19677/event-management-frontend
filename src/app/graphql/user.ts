import { gql } from "@apollo/client";


export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(input : {email: $email, password: $password}) {
      authToken {
        accessToken
      }
    }
  }
`;

export const REGISTER_MUTATION = gql`
  mutation Register($name: String!, $email: String!, $phoneNumber: String!, $password: String!) {
    createUser(input : {
        name : $name,
        email : $email,
        phoneNumber : $phoneNumber,
        password : $password
    })
  }
`;