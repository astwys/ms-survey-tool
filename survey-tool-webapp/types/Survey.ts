export type QuestionType = 'ShortText' | 'LongText'

export type BaseQuestion = {
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
