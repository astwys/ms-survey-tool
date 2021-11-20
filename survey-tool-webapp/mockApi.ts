import { mockSurveys } from './mockData'
import { Survey } from './types/Survey'
import { Without } from './types/utils'

type BaseSurvey = Without<Survey, 'id'>

let surveys = [...mockSurveys]

export function findAll(): Survey[] {
  return surveys
}

export function findById(id: number): Survey | undefined {
  console.log(surveys)
  return surveys.find(s => s.id === id)
}

export function createOne(baseSurvey: BaseSurvey) {
  const id = surveys[surveys.length -1].id + 1
    const survey = {
      ...baseSurvey,
      id
    }
    surveys = [...surveys, survey]
    return survey
}