import { Survey, SurveyAnswers } from './types/Survey'

const mockSurveys: Survey[] = [
  {
    id: '1',
    name: 'S1',
    questions: [
      {
        id: '1',
        type: 'ShortText',
        text: 'What is your name',
      },
    ],
  },
]

const mockAnswers: SurveyAnswers = {
  '1': [
    {
      '1': 'Michael',
    },
  ],
}
export { mockSurveys, mockAnswers }
