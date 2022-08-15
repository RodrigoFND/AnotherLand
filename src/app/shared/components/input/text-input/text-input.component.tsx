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
    const { formName, label, icon, errors, register, ...rest } = props
    const formHasError = errors ? errors[formName] : null
    return (
      <div
        className={`al-input-wrapper   ${
          !props.icon ? 'al-input-icon-disabled' : ''
        }`}
      >
        <input
          className={`al-input ${formHasError ? 'ai-form-input-error' : ''}`}
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
        {icon && <i className="al-input-icon ">{props.icon}</i>}

        {label && <label>{label}</label>}
      </div>
    )
  }
)
TextInput.displayName = 'TextInput'
export default TextInput
