import { FieldErrors } from 'react-hook-form'
import './cpf-cnpj-input.component.scss'
import React from 'react'
import Input from '../input.component'
import { cnpjPattern, cpfPattern } from '../../../patterns/patterns'
import vanillaMasker from 'vanilla-masker'

interface CpfCnpjProps {
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

const CpfCnpjInput = React.forwardRef(
  (inputProps: CpfCnpjProps, ref: React.Ref<HTMLInputElement>) => {
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
      if (e.target.value.length > 14) {
        vanillaMasker(e.target).maskPattern(cnpjPattern)
      } else {
        vanillaMasker(e.target).maskPattern(cpfPattern)
      }
    }

    return (
      <div
        className={`al-input-wrapper   ${
          !icon ? 'al-input-icon-disabled' : ''
        }`}
      >
        <Input
          className={`
          al-input 
         ${disabled && 'al-input-disabled'} 
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
            className={`al-input-icon 
            ${disabled && 'al-input-disabled'} `}
          >
            {icon}
          </i>
        )}
      </div>
    )
  }
)

CpfCnpjInput.displayName = 'CpfCnpjInput'
export default CpfCnpjInput
