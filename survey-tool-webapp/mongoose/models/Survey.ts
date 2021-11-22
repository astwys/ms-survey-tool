import mongoose from 'mongoose'
import { QuestionSchema } from './Question'

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
