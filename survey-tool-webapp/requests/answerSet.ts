import { Answers } from '../types/Survey'

export function createAnswerSet(surveyId: string, answerSet: Answers): Promise<Response> {
  return fetch(`/api/survey/${surveyId}/answerSet`, {
    body: JSON.stringify(answerSet),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  })
}
