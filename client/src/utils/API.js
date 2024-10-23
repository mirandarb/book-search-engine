// route to get logged in user's info (needs the token)
export const getMe = async (token) => {
  const response = await fetch('/api/users/me', {
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch user data');
  }

  return response.json(); // Return parsed JSON data
};

export const createUser = async (userData) => {
  const response = await fetch('/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Failed to create user: ${errorData.message}`);
  }

  return response.json();
};


export const loginUser = async (userData) => {
  const response = await fetch('/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Login failed: ${errorData.message}`);
  }

  return response.json();
};

// save book data for a logged in user
export const saveBook = async (bookData, token) => {
  const response = await fetch('/api/users/books', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(bookData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Failed to save book: ${errorData.message}`);
  }

  return response.json();
};


// remove saved book data for a logged in user
export const deleteBook = async (bookId, token) => {
  const response = await fetch(`/api/users/books/${bookId}`, {
    method: 'DELETE',
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Failed to delete book: ${errorData.message}`);
  }

  return response.json();
};


// make a search to google books api
// https://www.googleapis.com/books/v1/volumes?q=harry+potter
export const searchGoogleBooks = async (query) => {
  const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Error fetching books: ${errorData.error.message}`);
  }

  return response.json(); // Return the parsed JSON data directly
};