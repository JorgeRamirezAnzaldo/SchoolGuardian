const { Schema, model } = require('mongoose');

const studentEvaluationSchema = new Schema({
    studentId:{
        type: Schema.Types.ObjectId, 
        ref: "Student",
        required:true
    },
    score: {
        type: Number,
        required: true
    }
})

const StudentEvaluation = model('StudentEvaluation', studentEvaluationSchema);

module.exports = StudentEvaluation;