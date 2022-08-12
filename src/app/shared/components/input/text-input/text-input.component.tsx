import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import { Props } from '../../../../model/root/root-model'
import './text-input.component.scss'
import CapitalizeFirstWord from '../../../../utils/string-functions/capitalize-fist-word'

class TextInputProps extends Props {
  icon?: JSX.Element
  label?: string
  isPassword?: boolean
  register?: UseFormRegister<FieldValues>
  formName?: string
  errors?: FieldErrors
}

function TextInputComponent(props: TextInputProps) {
  const register = props?.register ? props.register(props?.formName) : {}
  const errors = props?.errors
  return (
    <>
      <div
        className={`al-input-wrapper ${
          !props.icon ? 'al-input-icon-disabled' : ''
        }`}
      >
        <input className="al-input" type={'text'} {...register} />
        {errors && (
          <ErrorMessage
            errors={props?.errors}
            name={props?.formName}
            render={({ message }) => <div>{CapitalizeFirstWord(message)}</div>}
          />
        )}
        {props.icon ? <i className="al-input-icon ">{props.icon}</i> : <></>}
        {props.label ? <label>{props.label}</label> : <></>}
      </div>
    </>
  )
}

export default TextInputComponent
