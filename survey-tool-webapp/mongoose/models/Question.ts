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

export { QuestionSchema }

export default mongoose.models.Question || mongoose.model('Question', QuestionSchema)
