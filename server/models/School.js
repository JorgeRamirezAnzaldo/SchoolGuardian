const { Schema, model } = require('mongoose');
const Class = require('./Class');

const schoolSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    principal: {
        type: Schema.Types.ObjectId, 
        ref: "Professor"
    },
    classes : [Class]
})


const School = model('School', schoolSchema);

module.exports = School;