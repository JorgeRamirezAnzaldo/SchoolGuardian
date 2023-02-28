const { Schema, model } = require('mongoose');

const classEvaluationSchema = new Schema({
    classId : {
        type: Schema.Types.ObjectId, 
        ref: "Class",
        required: true
    },
    evaluationDate: {
        type: String,
        required: true,
    },
    studentEvaluations: [{
        studentId:{
            type: Schema.Types.ObjectId, 
            ref: "Student",
            required:true
        },
        score: {
            type: Number,
            required: true
        }
    }]
})


const ClassEvaluation = model('ClassEvaluation', classEvaluationSchema);

module.exports = ClassEvaluation;