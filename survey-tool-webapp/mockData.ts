import { Survey } from './types/Survey'

const mockSurveys: Survey[] = [{
  "id": 1,
  "name": "S1",
  "questions": [{
    "type": "ShortText",
    "text": "What is your name"
  }]
}]

export {
  mockSurveys
}