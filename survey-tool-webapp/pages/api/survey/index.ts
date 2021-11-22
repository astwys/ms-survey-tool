import type { NextApiRequest, NextApiResponse } from 'next'
import { Survey } from '../../../types/Survey'
import { findAll, createOne } from '../../../mockApi'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Survey | Survey[] | string>,
) {
  if (req.method === 'GET') {
    const surveys = findAll()
    res.status(200).json(surveys)
  } else if (req.method === 'POST') {
    const survey = createOne(req.body)
    res.status(200).json(survey)
  } else {
    res.status(501).send('Not Implemented')
  }
}
