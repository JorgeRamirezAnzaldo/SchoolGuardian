const { Schema, model } = require('mongoose');

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
        required: true
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


const Class = model('Class', classSchema);

module.exports = Class;