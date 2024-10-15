import { gql } from '@apollo/client';
import { client } from './apolloClient'; // Adjust the import based on your Apollo Client setup

// GraphQL Queries and Mutations
const GET_ME = gql`
  query me {
    me {
      id
      username
      email
      savedBooks {
        id
        title
        author
        description
        image
        link
      }
    }
  }
`;

const CREATE_USER = gql`
  mutation createUser($username: String!, $email: String!, $password: String!) {
    signup(username: $username, email: $email, password: $password) {
      token
      user {
        id
        username
        email
      }
    }
  }
`;

const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        username
        email
      }
    }
  }
`;

const SAVE_BOOK = gql`
  mutation saveBook($bookData: BookInput!) {
    saveBook(bookData: $bookData) {
      id
      title
      author
      description
      image
      link
    }
  }
`;

const DELETE_BOOK = gql`
  mutation deleteBook($bookId: ID!) {
    removeBook(bookId: $bookId) {
      id
    }
  }
`;

// API Functions
export const getMe = async (token) => {
  return client.query({
    query: GET_ME,
    context: {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  });
};

export const createUser = async (userData) => {
  const { data } = await client.mutate({
    mutation: CREATE_USER,
    variables: { ...userData },
  });
  return data.signup;
};

export const loginUser = async (userData) => {
  const { data } = await client.mutate({
    mutation: LOGIN_USER,
    variables: { ...userData },
  });
  return data.login;
};

export const saveBook = async (bookData, token) => {
  const { data } = await client.mutate({
    mutation: SAVE_BOOK,
    variables: { bookData },
    context: {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  });
  return data.saveBook;
};

export const deleteBook = async (bookId, token) => {
  const { data } = await client.mutate({
    mutation: DELETE_BOOK,
    variables: { bookId },
    context: {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  });
  return data.removeBook;
};

// Make a search to Google Books API
export const searchGoogleBooks = (query) => {
  return fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
};
