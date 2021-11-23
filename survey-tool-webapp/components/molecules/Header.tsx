import Link from 'next/link'
import useUser from '../../lib/useUser'
import { useRouter } from 'next/router'
import fetchJson from '../../lib/fetchJson'
import styles from './Header.module.css'

export default function Header() {
  const { user, mutateUser } = useUser()
  const router = useRouter()

  return (
    <header>
      <nav>
        <ul className={styles.ul}>
          <li className={styles.li}>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          {user?.isLoggedIn && (
            <li className={styles.li}>
              <Link href="/dashboard">
                <a>Dashboard</a>
              </Link>
            </li>
          )}
          {!user?.isLoggedIn && (
            <li className={styles.li}>
              <Link href="/login">
                <a>Login</a>
              </Link>
            </li>
          )}
          {user?.isLoggedIn && (
            <li className={styles.li}>
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
