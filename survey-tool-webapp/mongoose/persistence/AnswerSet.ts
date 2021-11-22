import { Answers } from '../../types/Survey'
import SurveyAnswersModel from '../models/Answer'

export async function createAnswerSetBySurveyId(id: string, answerSet: Answers): Promise<Answers> {
  const answers = await SurveyAnswersModel.findOneAndUpdate(
    { surveyId: id },
    { $push: { answers: answerSet } },
    { upsert: true },
  )
  return answers
}
