import type { NextApiRequest, NextApiResponse } from 'next'
import { createAnswerSetBySurveyId } from '../../../../mongoose/persistence/AnswerSet'
import dbConnect from '../../../../lib/dbConnect'
import { Answers } from '../../../../types/Survey'

export default async function handler(req: NextApiRequest, res: NextApiResponse<Answers | string>) {
  const { id } = req.query

  await dbConnect()
  if (req.method === 'POST') {
    await createAnswerSetBySurveyId(id as string, req.body)
    res.status(200).send('Success')
  } else {
    res.status(501).send('Not Implemented')
  }
}
