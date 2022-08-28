import { FieldErrors } from 'react-hook-form'
import './phone-input.component.scss'
import React from 'react'
import Input from '../input.component'
import { cellPhonePattern, phonePattern } from '../../../patterns/patterns'
import { removeNonDigitValues } from '../../../../utils/string-functions/remove-non-number'
import vanillaMasker from 'vanilla-masker'

interface PhoneProps {
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
}

const PhoneInput = React.forwardRef(
  (inputProps: PhoneProps, ref: React.Ref<HTMLInputElement>) => {
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
    } = inputProps
    const formHasError = errors ? errors[name] : null

    const onKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
      const telefonePattern: string =
        removeNonDigitValues(e.target.value).length === 11
          ? cellPhonePattern
          : phonePattern
      e.target.value = vanillaMasker.toPattern(e.target.value, telefonePattern)
    }
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
         ${formHasError && 'ai-form-input-error'}`}
          aria-label="Default select example"
          type={'text'}
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
          onKeyUp={onKeyUp}
          pattern={'[+-]?d+(?:[.,]d+)?'}
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

PhoneInput.displayName = 'PhoneInput'
export default PhoneInput
