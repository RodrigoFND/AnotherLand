import { ErrorMessage } from '@hookform/error-message'
import React from 'react'
import { FormSelect } from 'react-bootstrap'
import { FieldErrors } from 'react-hook-form'
import camelCaseSeparator from '../../../../utils/string-functions/camel-case-separator'
import './select-input.component.scss'

interface SelectProps {
  onChange?: React.ChangeEventHandler<HTMLSelectElement>
  onBlur?: React.FocusEventHandler<HTMLSelectElement>
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
      <>
        <FormSelect
          aria-label="Default select example"
          value={value}
          name={name}
          onChange={onChange}
          onBlur={onBlur}
          ref={ref}
        >
          {placeholder && (
            <option disabled={true} onKeyDown={(e) => e.preventDefault()}>
              {placeholder}
            </option>
          )}
          {options &&
            options.map((value, index) => {
              return getOption(index, value)
            })}
        </FormSelect>
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

Select.displayName = 'Select'
export default Select
