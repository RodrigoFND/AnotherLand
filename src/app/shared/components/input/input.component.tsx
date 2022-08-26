import { ErrorMessage } from '@hookform/error-message'
import React, { HTMLInputTypeAttribute } from 'react'
import { FieldErrors } from 'react-hook-form'
import camelCaseSeparator from '../../../utils/string-functions/camel-case-separator'
import './input.component.scss'

export interface InputProps {
  name?: string
  label?: string
  placeholder?: string
  errors?: FieldErrors
  value?: string | number | readonly string[]
  disabled?: boolean
  type?: HTMLInputTypeAttribute
  className?: string
  onChange?: React.ChangeEventHandler<HTMLElement>
  onBlur?: React.FocusEventHandler<HTMLElement>
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>
}

const Input = React.forwardRef(
  (inputProps: InputProps, ref: React.LegacyRef<HTMLInputElement>) => {
    const {
      onChange,
      onBlur,
      onKeyDown,
      errors,
      value,
      name,
      label,
      placeholder,
      disabled,
      type,
      className,
    } = inputProps

    return (
      <>
        <input
          aria-label="Default select example"
          className={className}
          type={type}
          value={value}
          name={name}
          onChange={onChange}
          onBlur={onBlur}
          ref={ref}
          disabled={disabled}
          placeholder={placeholder}
          onKeyDown={onKeyDown}
        />

        {errors && (
          <ErrorMessage
            errors={errors}
            name={name}
            render={({ message }) => (
              <div className="al-form-error-icon">
                {camelCaseSeparator(message)}
              </div>
            )}
          />
        )}
        {label && (
          <label className={`${disabled && 'al-input-disabled'} `}>
            {label}
          </label>
        )}
      </>
    )
  }
)

Input.displayName = 'Input'
export default Input
