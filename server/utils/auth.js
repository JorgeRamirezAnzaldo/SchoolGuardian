//Import jsonwebtoken
const jwt = require('jsonwebtoken');
//Import dotenv and configure it
require('dotenv').config();

//Establish token secret and expiration
const secret = process.env.SECRET_TOKEN;
const expiration = '2h';

//Export authentication functions
module.exports = {
  //Function for the authenticated routes
  authMiddleware: function ({req}) {
    //Allow the token to be sent through req.query or headers
    let token = req.body.token || req.query.token || req.headers.authorization;

    // ["Bearer", "<tokenvalue>"]
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }
    if (!token) {
      return req;
    }
    //Verify token and obtain user data from it 
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log('Invalid token');
    }
    return req;
  },
  //Function to sign token using jsonwebtoken
  signToken: function ({ username, name, usertype, email, _id }) {
    const payload = { username, name, usertype, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
