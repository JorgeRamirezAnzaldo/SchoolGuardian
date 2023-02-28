const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const professorSchema = new Schema({
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
    principal: {
        type: Boolean,
        required: true
    },
    classes: [{
        type: Schema.Types.ObjectId,
        ref: "Class"
    }]
})

professorSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
  
    next();
  });
  
 professorSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
  };


const Professor = model('Professor', professorSchema);

module.exports = Professor;