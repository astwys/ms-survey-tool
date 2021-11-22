import type { NextApiRequest, NextApiResponse } from 'next'
import { Survey } from '../../../types/Survey'
import dbConnect from '../../../lib/dbConnect'
import { createOne, findAll } from '../../../mongoose/persistence/Survey'
import { withIronSessionApiRoute } from 'iron-session/next'
import { sessionOptions } from '../../../lib/session'

export default withIronSessionApiRoute(handler, sessionOptions)

async function handler(req: NextApiRequest, res: NextApiResponse<Survey | Survey[] | string>) {
  await dbConnect()
  if (req.method === 'GET') {
    const surveys = await findAll()
    res.status(200).json(surveys)
  } else if (req.method === 'POST') {
    if (!req.session.user) {
      res.status(401).send('Unauthorized')
      return
    }

    const survey = await createOne(req.body)
    if (!survey) {
      res.status(400).send("Couldn't create survey.")
    }
    res.status(200).json(survey as Survey)
  } else {
    res.status(501).send('Not Implemented')
  }
}
