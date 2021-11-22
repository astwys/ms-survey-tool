import { withIronSessionApiRoute } from 'iron-session/next'
import { sessionOptions } from '../../lib/session'
import { NextApiRequest, NextApiResponse } from 'next'
import { User } from '../../types/User'
import checkAdmin from '../../lib/checkAdmin'

export default withIronSessionApiRoute(loginRoute, sessionOptions)

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  const { username, password } = await req.body

  try {
    const isValid = checkAdmin(username, password)

    if (!isValid) {
      throw new Error('Username or password is invalid!')
    }

    const user: User = { isLoggedIn: true }
    req.session.user = user
    await req.session.save()
    res.json(user)
  } catch (error) {
    res.status(500).json({ message: (error as Error).message })
  }
}
