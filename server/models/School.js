//Import Schema and model from mongoose
const { Schema, model } = require('mongoose');

//Create schoolSchema with proper fields
const schoolSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    principal: {
        type: Schema.Types.ObjectId, 
        ref: "Professor"
    },
    classes : [{
        type: Schema.Types.ObjectId, 
        ref: "Class"
    }],
})

//Create School model using the schoolSchema
const School = model('School', schoolSchema);

//Export School model
module.exports = School;
