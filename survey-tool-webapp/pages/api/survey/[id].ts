import type { NextApiRequest, NextApiResponse } from 'next'
import { Survey } from '../../../types/Survey'
import { findById } from '../../../mockApi'

export default function handler(req: NextApiRequest, res: NextApiResponse<Survey | string>) {
  const { id } = req.query
  const idNumber = parseInt(id as string)
  const survey = findById(idNumber)
  if (!survey) {
    res.status(404).send('Not Found')
    return
  }
  res.status(200).json(survey)
}
