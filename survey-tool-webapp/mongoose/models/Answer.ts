import mongoose from 'mongoose'

const AnswersSchema = new mongoose.Schema({
  questionId: mongoose.Types.ObjectId,
  text: String,
})
const SurveyAnswersSchema = new mongoose.Schema({
  surveyId: mongoose.Types.ObjectId,
  answers: [AnswersSchema],
})

export { SurveyAnswersSchema }

export default mongoose.models.SurveyAnswers || mongoose.model('SurveyAnswers', SurveyAnswersSchema)
