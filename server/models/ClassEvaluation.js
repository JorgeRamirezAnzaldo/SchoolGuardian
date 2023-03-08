//Import Schema and model from mongoose
const { Schema, model } = require('mongoose');

//Create classEvaluationSchema with proper fields
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

//Create ClassEvaluation model using the classEvaluationSchema
const ClassEvaluation = model('ClassEvaluation', classEvaluationSchema);

//Export ClassEvaluation model
module.exports = ClassEvaluation;