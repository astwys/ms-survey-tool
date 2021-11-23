import mongoose from 'mongoose'

const QuestionSchema = new mongoose.Schema({
  type: {
    type: String,
    required: [true, 'Please provide a type for this question.'],
  },
  text: {
    type: String,
    required: [true, 'Please provide a text for this question.'],
  },
})

const SurveySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name for this survey.'],
  },
  questions: {
    type: [QuestionSchema],
    required: [true, 'Please provice questions for this survey.'],
  },
})

export { SurveySchema }

export default mongoose.models.Survey || mongoose.model('Survey', SurveySchema)
