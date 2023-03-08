//Import Schema and model from mongoose
const { Schema, model } = require('mongoose');

//Create classSchema with proper fields
const classSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    grade: {
        type: Number,
        required: true
    },
    professor:{
        type: Schema.Types.ObjectId, 
        ref: "Professor",
    },
    hour: {
        type: String,
        required: true,
    },
    students: [{                          
        type: Schema.Types.ObjectId,
        ref: "Student"
    }]

})

//Create Class model using the classSchema
const Class = model('Class', classSchema);

//Export Class model
module.exports = Class;