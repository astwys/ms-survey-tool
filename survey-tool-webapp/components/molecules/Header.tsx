import Link from 'next/link'
import useUser from '../../lib/useUser'
import { useRouter } from 'next/router'
import fetchJson from '../../lib/fetchJson'

export default function Header() {
  const { user, mutateUser } = useUser()
  const router = useRouter()

  console.log('user:', user)
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          {user?.isLoggedIn === false && (
            <li>
              <Link href="/login">
                <a>Login</a>
              </Link>
            </li>
          )}
          {user?.isLoggedIn === true && (
            <li>
              <a
                href="/api/logout"
                onClick={async e => {
                  e.preventDefault()
                  mutateUser(await fetchJson('/api/logout', { method: 'POST' }), false)
                  router.push('/login')
                }}
              >
                Logout
              </a>
            </li>
          )}
        </ul>
      </nav>
    </header>
  )
}
