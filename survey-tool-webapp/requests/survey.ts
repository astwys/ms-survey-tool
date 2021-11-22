import { Survey, SurveyWithoutId } from '../types/Survey'

export function updateSurvey(id: number, survey: Survey): Promise<Response> {
  return fetch(`/api/survey/${id}`, {
    body: JSON.stringify(survey),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'PUT',
  })
}

export function createSurvey(survey: SurveyWithoutId): Promise<Response> {
  return fetch('/api/survey', {
    body: JSON.stringify(survey),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  })
}
