import { Without } from './utils'

export type QuestionType = 'ShortText' | 'LongText'

export type BaseQuestion = {
  id: string
  type: QuestionType
  text: string
}

export interface ShortTextQuestion extends BaseQuestion {}

export interface LongTextQuestion extends BaseQuestion {
  data?: {
    maxChars: number
  }
}

export type Question = ShortTextQuestion | LongTextQuestion

export type Survey = {
  id: string
  name: string
  questions: Question[]
}

export type SurveyWithoutId = Without<Survey, 'id'>

// id: question id
export type ShortTextAnswers = {
  [id: string]: string
}

// id: question id
export type LongTextAnswers = {
  [id: string]: string
}

export type Answers = ShortTextAnswers | LongTextAnswers

// id: survey id
export type SurveyAnswers = {
  [id: string]: Answers[]
}
