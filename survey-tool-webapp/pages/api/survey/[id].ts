import { withIronSessionApiRoute } from 'iron-session/next'
import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../lib/dbConnect'
import { sessionOptions } from '../../../lib/session'
import { findById, updateById } from '../../../mongoose/persistence/Survey'
import { Survey } from '../../../types/Survey'

export default withIronSessionApiRoute(handler, sessionOptions)

async function handler(req: NextApiRequest, res: NextApiResponse<Survey | string>) {
  const { id } = req.query

  await dbConnect()
  if (req.method === 'GET') {
    const survey = await findById(id as string)
    if (!survey) {
      res.status(404).send('Not Found')
      return
    }
    res.status(200).json(survey)
  } else if (req.method === 'PUT') {
    if (!req.session.user) {
      res.status(401).send('Unauthorized')
      return
    }

    const survey = await updateById(id as string, req.body)
    if (!survey) {
      res.status(404).send('Not Found')
      return
    }
    res.status(200).json(survey)
  } else {
    res.status(501).send('Not Implemented')
  }
}
