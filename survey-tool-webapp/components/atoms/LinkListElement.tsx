import Link from 'next/link'

type LinkListElementProps = {
  text: string
  href: string
}
const LinkListElement = (props: LinkListElementProps) => {
  return (
    <li>
      <Link href={props.href}>
        <a>{props.text}</a>
      </Link>
    </li>
  )
}

export default LinkListElement
