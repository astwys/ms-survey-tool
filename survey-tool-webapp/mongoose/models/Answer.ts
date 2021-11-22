import mongoose from 'mongoose'

const AnswersSchema = new mongoose.Schema({
  key: String,
  value: String,
})
const SurveyAnswersSchema = new mongoose.Schema({
  key: String,
  value: [AnswersSchema],
})

export { SurveyAnswersSchema }

export default mongoose.models.SurveyAnswers || mongoose.model('SurveyAnswers', SurveyAnswersSchema)
