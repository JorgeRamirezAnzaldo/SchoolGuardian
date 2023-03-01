const { Schema, model } = require('mongoose');

const professorSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
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

const Professor = model('Professor', professorSchema);

module.exports = Professor;