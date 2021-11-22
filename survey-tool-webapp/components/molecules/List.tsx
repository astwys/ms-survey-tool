type ListProps = {
  children?: React.ReactNode
}

const List = (props: ListProps) => {
  return <ul>{props.children}</ul>
}

export default List
