import { gql } from '@apollo/client';

export const REGISTER_USER = gql`
    mutation RegisterUser($registrationInput: RegistrationInput) {
        registerUser(registrationInput: $registrationInput) {
            __typename
        }
    }
`;