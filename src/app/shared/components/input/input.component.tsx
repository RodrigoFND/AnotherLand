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
  pattern?: string
  onChange?: React.ChangeEventHandler<HTMLElement>
  onBlur?: React.FocusEventHandler<HTMLElement>
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>
  onKeyUp?: React.KeyboardEventHandler<HTMLInputElement>
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
      pattern,
      onKeyUp,
    } = inputProps
    const formHasError = errors ? errors[name] : null
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
          pattern={pattern || null}
          onKeyUp={onKeyUp}
        />

        {errors && (
          <ErrorMessage
            errors={errors}
            name={name}
            render={({ message }) => (
              <div className={`${formHasError && 'al-form-error-message'}`}>
                {camelCaseSeparator(message)}
              </div>
            )}
          />
        )}
        {label && <label>{label}</label>}
      </>
    )
  }
)

Input.displayName = 'Input'
export default Input
