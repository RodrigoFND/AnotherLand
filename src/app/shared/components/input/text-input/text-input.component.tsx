import { FieldErrors } from 'react-hook-form'
import './text-input.component.scss'
import React from 'react'
import Input from '../input.component'

interface TextProps {
  onChange?: React.ChangeEventHandler<HTMLElement>
  onBlur?: React.FocusEventHandler<HTMLElement>
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>
  name?: string
  label?: string
  placeholder?: string
  errors?: FieldErrors
  value?: string | number | readonly string[]
  disabled?: boolean
  icon?: JSX.Element
  type?: 'password' | 'text'
}

const TextInput = React.forwardRef(
  (inputProps: TextProps, ref: React.Ref<HTMLInputElement>) => {
    const {
      onChange,
      onBlur,
      onKeyDown,
      errors,
      value,
      name,
      label,
      icon,
      placeholder,
      disabled,
      type,
    } = inputProps
    const formHasError = errors ? errors[name] : null
    return (
      <div
        className={`
        al-input-wrapper 
        ${icon && 'al-input-has-right-icon'}
        ${formHasError && 'ai-form-input-error'}
        `}
      >
        <Input
          className={`
         `}
          aria-label="Default select example"
          type={type ? type : 'text'}
          value={value}
          name={name}
          ref={ref}
          disabled={disabled}
          placeholder={placeholder}
          label={label}
          errors={errors}
          onChange={onChange}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
        />

        {icon && (
          <i
            className={`
          al-input-icon-right
          ${formHasError && 'al-form-error-icon'}
          
          `}
          >
            {icon}
          </i>
        )}
      </div>
    )
  }
)
TextInput.displayName = 'TextInput'
export default TextInput
