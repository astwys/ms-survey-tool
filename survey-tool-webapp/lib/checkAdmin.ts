export default function checkAdmin(username: string, password: string): boolean {
  return username === process.env.ADMIN_USER && password === process.env.ADMIN_PWD
}
