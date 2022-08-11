import { Props } from '../../../../model/root/root-model'

import './text-input.component.scss'
class TextInputProps extends Props {
  icon?: JSX.Element
  label?: string
  isPassword?: boolean
}
function TextInputComponent(props: TextInputProps) {
  return (
    <>
      <div
        className={`al-input-wrapper ${
          !props.icon ? 'al-input-icon-disabled' : ''
        }`}
      >
        <input className="al-input" type={'text'} {...props.input} />
        {props.icon ? <i className="al-input-icon ">{props.icon}</i> : <></>}
        {props.label ? <label>{props.label}</label> : <></>}
      </div>
    </>
  )
}

export default TextInputComponent
