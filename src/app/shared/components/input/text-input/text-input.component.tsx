import { FieldErrors, UseFormRegisterReturn } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import './text-input.component.scss'
import camelCaseSeparator from '../../../../utils/string-functions/camel-case-separator'
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
    const { formName, label, icon, errors, register, disabled, ...rest } = props
    const formHasError = errors ? errors[formName] : null
    return (
      <div
        className={`al-input-wrapper   ${
          !props.icon ? 'al-input-icon-disabled' : ''
        }`}
      >
        <input
          className={`
            al-input 
           ${disabled && 'al-input-disabled'} 
           ${formHasError && 'ai-form-input-error'}`}
          disabled={disabled}
          type={'text'}
          ref={ref}
          {...register}
          {...rest}
        />
        {errors && (
          <ErrorMessage
            errors={errors}
            name={formName}
            render={({ message }) => (
              <div className="al-form-error-icon">
                {camelCaseSeparator(message)}
              </div>
            )}
          />
        )}
        {icon && (
          <i
            className={`al-input-icon 
            ${disabled && 'al-input-disabled'} `}
          >
            {props.icon}
          </i>
        )}

        {label && (
          <label className={`${disabled && 'al-input-disabled'} `}>
            {label}
          </label>
        )}
      </div>
    )
  }
)
TextInput.displayName = 'TextInput'
export default TextInput
