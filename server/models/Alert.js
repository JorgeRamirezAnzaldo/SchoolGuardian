//Import Schema and model from mongoose
const { Schema, model } = require('mongoose');

//Create alertSchema with proper fields
const alertSchema = new Schema({
    subject: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    from: {
        type: Schema.Types.ObjectId, 
        ref: "Professor",
    },
    sign: {
        type: Boolean,
        required: true
    },
})

//Create Alert model using the alertSchema
const Alert = model('Alert', alertSchema);

//Export Alert model
module.exports = Alert;