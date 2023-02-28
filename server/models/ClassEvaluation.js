const { Schema, model } = require('mongoose');
const StudentEvaluation = require('./StudentEvaluation');

const classEvaluationSchema = new Schema({
    classId : {
        type: Schema.Types.ObjectId, 
        ref: "Class",
        required: true
    },
    evaluationDate: {
        type: Date,
        required: true,
    },
    //studentEvaluations: [StudentEvaluation]
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