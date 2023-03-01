const { Schema, model } = require('mongoose');
const Class = require('./Class');

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

const Alert = model('Alert', alertSchema);

module.exports = Alert;