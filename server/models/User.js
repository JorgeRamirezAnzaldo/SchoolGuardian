//Import Schema and model from mongoose
const { Schema, model } = require('mongoose');
//Import bcrypt
const bcrypt = require('bcrypt');

//Create userSchema with proper fields
const userSchema = new Schema({
    username:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    telephone: {
        type: String,
        required: true
    },
    usertype: {
        type: String,
        required: true
    }

})

//Define function to hash the password when the user is new or if the password has been modified
userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
  
    next();
  });

//Define function to compare the password using bcrypt
userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
  };

//Create User model using the userSchema
const User = model('User', userSchema);

//Export User model
module.exports = User;