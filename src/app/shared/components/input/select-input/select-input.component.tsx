import { ErrorMessage } from '@hookform/error-message'
import React from 'react'
import { FormSelect } from 'react-bootstrap'
import { FieldErrors } from 'react-hook-form'
import camelCaseSeparator from '../../../../utils/string-functions/camel-case-separator'
import './select-input.component.scss'

interface SelectProps {
  onChange?: React.ChangeEventHandler<HTMLSelectElement>
  onBlur?: React.FocusEventHandler<HTMLSelectElement>
  onKeyDown?: React.KeyboardEventHandler<HTMLSelectElement>
  name?: string
  label?: string
  placeholder?: string
  options?: Array<unknown>
  bindLabel?: string
  bindValue?: string
  errors?: FieldErrors
  value?: string | number | readonly string[]
  disabled?: boolean
}

const Select = React.forwardRef(
  (selectProps: SelectProps, ref: React.Ref<HTMLSelectElement>) => {
    const {
      onChange,
      onBlur,
      onKeyDown,
      errors,
      value,
      name,
      label,
      placeholder,
      options,
      bindLabel,
      bindValue,
      disabled,
    } = selectProps
    const formHasError = errors ? errors[name] : null

    const getOption = (index: number, value: any) => {
      if (typeof value == 'object') {
        if (bindLabel && bindValue) {
          return (
            <option key={index} value={value[bindValue]}>
              {value[bindLabel]}
            </option>
          )
        }
        if (bindLabel) {
          return (
            <option key={index} value={JSON.stringify(value)}>
              {value[bindLabel]}
            </option>
          )
        }
        if (bindValue) {
          return (
            <option key={index} value={value[bindValue]}>
              {JSON.stringify(value)}
            </option>
          )
        }
        return (
          <option key={index} value={JSON.stringify(value)}>
            {' '}
            {JSON.stringify(value)}{' '}
          </option>
        )
      }
      return (
        <option key={index} value={value}>
          {value}
        </option>
      )
    }

    return (
      <div
        className={` 
      al-select-wrapper
      ${formHasError && 'ai-form-input-error'}`}
      >
        <FormSelect
          aria-label="Default select example"
          value={value}
          name={name}
          onChange={onChange}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
          ref={ref}
          disabled={disabled}
          defaultValue=""
        >
          <option
            value={null || ''}
            disabled
            key={0}
            onKeyDown={(e) => e.preventDefault()}
          >
            {placeholder}
          </option>
          {options &&
            options.map((value, index) => {
              return getOption(index + 1, value)
            })}
        </FormSelect>
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
      </div>
    )
  }
)

Select.displayName = 'Select'
export default Select
