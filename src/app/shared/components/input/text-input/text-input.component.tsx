import {
  FieldValues,
  Message,
  MultipleFieldErrors,
  Ref,
  UseFormRegister,
} from 'react-hook-form'
import { Props } from '../../../../model/root/root-model'
import './text-input.component.scss'

export type FieldError = {
  type: string
  ref?: Ref
  types?: MultipleFieldErrors
  message?: Message
}

class TextInputProps extends Props {
  icon?: JSX.Element
  label?: string
  isPassword?: boolean
  register?: UseFormRegister<FieldValues>
  formName?: string
  error?: FieldError
}

function TextInputComponent(props: TextInputProps) {
  const register = props?.register ? props.register(props?.formName) : {}
  const formError = props?.error.message
  return (
    <>
      <div
        className={`al-input-wrapper ${
          !props.icon ? 'al-input-icon-disabled' : ''
        }`}
      >
        <input className="al-input" type={'text'} {...register} />
        {formError && (
          <>
            <span>{formError}</span>
          </>
        )}
        {props.icon ? <i className="al-input-icon ">{props.icon}</i> : <></>}
        {props.label ? <label>{props.label}</label> : <></>}
      </div>
    </>
  )
}

export default TextInputComponent
