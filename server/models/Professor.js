//Import Schema and model from mongoose
const { Schema, model } = require('mongoose');

//Create professorSchema with proper fields
const professorSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    schoolId: {
        type: Schema.Types.ObjectId,
        ref: "School"
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

//Create Professor model using the professorSchema
const Professor = model('Professor', professorSchema);

//Export Professor model
module.exports = Professor;