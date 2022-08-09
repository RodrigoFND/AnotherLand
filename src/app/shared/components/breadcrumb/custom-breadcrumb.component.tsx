import { Props } from '../../../model/root/root-model'

function CustomBreadcrumbComponent(props: Props) {
  const tree = props?.tree.replaceAll(' / ', ' > ')
  return (
    <div>
      <h1>{tree}</h1>
      <h2>{props.header}</h2>
      <div>{props.children}</div>
    </div>
  )
}

export default CustomBreadcrumbComponent
