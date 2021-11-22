import { Without } from './utils'

export type QuestionType = 'ShortText' | 'LongText'

export type BaseQuestion = {
  _id?: string
  type: QuestionType
  text: string
  tempId?: string // used during create/edit process
}

export interface ShortTextQuestion extends BaseQuestion {}

export interface LongTextQuestion extends BaseQuestion {
  data?: {
    maxChars: number
  }
}

export type Question = ShortTextQuestion | LongTextQuestion

export type Survey = {
  _id: string
  name: string
  questions: Question[]
}

export type SurveyWithoutId = Without<Survey, '_id'>
export type QuestionWithoutId = Without<Question, '_id'>

export type BaseAnswer = {
  _id?: string
  questionId: string
}

export interface ShortTextAnswers extends BaseAnswer {
  text: string
}

export interface LongTextAnswers extends BaseAnswer {
  text: string
}

export type Answers = ShortTextAnswers | LongTextAnswers

export type SurveyAnswers = {
  _id?: string
  surveyId: string
  answers: Answers[]
}
