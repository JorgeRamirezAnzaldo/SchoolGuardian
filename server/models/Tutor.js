const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const tutorSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    telephone: {
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
    students: [{
        type: Schema.Types.ObjectId,
        ref: "Student"
    }]
})

tutorSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
  
    next();
  });
  
 tutorSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
  };


const Tutor = model('Tutor', tutorSchema);

module.exports = Tutor;