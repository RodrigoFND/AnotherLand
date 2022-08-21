import { FieldErrors, UseFormRegisterReturn } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import './checkbox-input.component.scss'
import camelCaseSeparator from '../../../../utils/string-functions/camel-case-separator'
import React from 'react'

interface CheckboxProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  formName?: string
  label?: string
  errors?: FieldErrors
  register?: UseFormRegisterReturn<string>
}

const CheckboxInput = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (props, ref) => {
    const { formName, label, errors, register, disabled, ...rest } = props
    const formHasError = errors ? errors[formName] : null
    return (
      <div
        className={`al-input-wrapper al-input-checkbox-container align-self-center`}
        style={{ display: 'inline-block' }}
      >
        <input
          className={`
            al-input-check-box
            ${formHasError && 'ai-form-input-error'}
            ${disabled && 'al-input-disabled'}`}
          type={'checkbox'}
          ref={ref}
          disabled={disabled}
          {...register}
          {...rest}
        />
        {label && (
          <label
            className={`
            al-input-checkbox-label
            ms-2
                ${disabled && 'al-input-disabled'}`}
          >
            {label}
          </label>
        )}
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
      </div>
    )
  }
)
CheckboxInput.displayName = 'CheckboxInput'
export default CheckboxInput
