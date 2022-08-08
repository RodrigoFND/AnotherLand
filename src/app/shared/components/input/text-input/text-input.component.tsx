import { Props } from '../../../../model/root/root-model'

import './text-input.component.scss'
class TextInputProps extends Props {
  icon?: JSX.Element
}
function TextInputComponent(props: TextInputProps) {
  return (
    <>
      <div className="inputWrapper ">
        {props.icon ? <i className="input-icon">{props.icon}</i> : <></>}
        <input
          className={`w-100 standart-input ${
            props.icon ? 'input-with-icon' : ''
          }`}
          placeholder="Teste"
        />
      </div>
    </>
  )
}

export default TextInputComponent
