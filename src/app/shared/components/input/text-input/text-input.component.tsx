import { FieldErrors, UseFormRegisterReturn } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import './text-input.component.scss'
import CapitalizeFirstWord from '../../../../utils/string-functions/capitalize-fist-word'
import React from 'react'

interface InputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  formName?: string
  label?: string
  icon?: JSX.Element
  errors?: FieldErrors
  register?: UseFormRegisterReturn<string>
}

const TextInput = React.forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    const { name, formName, label, icon, errors, register, ...rest } = props
    console.log(errors)
    console.log(name)
    return (
      <div
        className={`al-input-wrapper   ${
          !props.icon ? 'al-input-icon-disabled' : ''
        }`}
      >
        <input
          className={`al-input ${errors.message ? 'ai-form-input-error' : ''}`}
          type={'text'}
          ref={ref}
          {...register}
          {...rest}
        />
        {errors && (
          <ErrorMessage
            errors={errors}
            name={formName}
            render={({ message }) => <div>{CapitalizeFirstWord(message)}</div>}
          />
        )}
        {icon && <i className="al-input-icon ">{props.icon}</i>}

        {label && <label>{label}</label>}
      </div>
    )
  }
)
TextInput.displayName = 'TextInput'
export default TextInput
