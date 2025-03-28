// graphql-queries.js
import { gql } from '@apollo/client';

export const GET_MESSAGES = gql`
  query {
    getMessages {
      question
      response
    }
  }
`;

export const ASK_QUESTION = gql`
  mutation AskQuestion($question: String!) {
    askQuestion(question: $question)
  }
`;
