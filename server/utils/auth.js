const jwt = require('jsonwebtoken');

// Set token secret and expiration date
const secret = process.env.JWT_SECRET || 'mysecretsshhhhh'; // Use environment variable for security
const expiration = '2h';

module.exports = {
  // Middleware for authenticated routes
  authMiddleware: async ({ req }) => {
    // Allows token to be sent via req.query or headers
    let token = req.query.token || req.headers.authorization;

    // ["Bearer", "<tokenvalue>"]
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    // If there's no token, return null user
    if (!token) {
      return { user: null };
    }

    // Verify token and get user data out of it
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      return { user: data }; // Return the user object for context
    } catch {
      console.log('Invalid token');
      return { user: null }; // Return null user on error
    }
  },
  
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
