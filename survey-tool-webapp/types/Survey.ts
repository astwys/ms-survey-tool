import { Without } from './utils'

export type QuestionType = 'ShortText' | 'LongText'

export type BaseQuestion = {
  id: number
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
  id: number
  name: string
  questions: Question[]
}

export type SurveyWithoutId = Without<Survey, 'id'>

export type ShortTextAnswers = {
  [id: number]: string
}
