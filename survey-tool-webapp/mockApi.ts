import { mockAnswers, mockSurveys } from './mockData'
import { Answers, Survey, SurveyAnswers, SurveyWithoutId } from './types/Survey'

let surveys = [...mockSurveys]
let answers: SurveyAnswers = { ...mockAnswers }

export function findAll(): Survey[] {
  return surveys
}

export function findById(id: string): Survey | undefined {
  return surveys.find(s => s.id === id)
}

export function createOne(baseSurvey: SurveyWithoutId) {
  const id = surveys[surveys.length - 1].id + 1
  const survey = {
    ...baseSurvey,
    id,
  }
  surveys = [...surveys, survey]
  return survey
}

export function updateById(id: string, survey: Survey): Survey | undefined {
  const idx = surveys.findIndex(s => s.id === id)

  if (idx === -1) {
    return
  }

  surveys[idx] = survey

  return survey
}

export function createAnswerSetBySurveyId(id: string, answerSet: Answers): Answers {
  answers[id].push(answerSet)
  return answerSet
}
