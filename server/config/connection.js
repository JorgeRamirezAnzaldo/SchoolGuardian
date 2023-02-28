//Import mongoose
const mongoose = require('mongoose');

//Create database connection for application and configure it
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/schoolguardian', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//Export mongoose connection
module.exports = mongoose.connection;
