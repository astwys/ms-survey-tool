import type { NextApiRequest, NextApiResponse } from 'next'
import { createAnswerSetBySurveyId } from '../../../../mockApi'
import { Answers } from '../../../../types/Survey'

export default function handler(req: NextApiRequest, res: NextApiResponse<Answers | string>) {
  const { id } = req.query
  if (req.method === 'POST') {
    const answerSet = createAnswerSetBySurveyId(id as string, req.body)
    res.status(200).json(answerSet)
  } else {
    res.status(501).send('Not Implemented')
  }
}
