import { FieldErrors } from 'react-hook-form'
import './checkbox-input.component.scss'
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
  children?: JSX.Element | JSX.Element[]
}

const CheckboxInput = React.forwardRef(
  (checkBoxProps: TextProps, ref: React.Ref<HTMLInputElement>) => {
    const {
      onChange,
      onBlur,
      onKeyDown,
      errors,
      value,
      name,
      label,
      placeholder,
      children,
      disabled,
    } = checkBoxProps
    const formHasError = errors ? errors[name] : null
    return (
      <div
        className={`
        d-flex
        overflow-hidden
   
        ${formHasError && 'ai-form-input-error'}
        `}
      >
        <div className="d-inline">
          <Input
            className={`
         ${formHasError && 'ai-form-input-error'}`}
            aria-label="Default select example"
            type={'checkbox'}
            value={value}
            name={name}
            ref={ref}
            disabled={disabled}
            placeholder={placeholder}
            label={label}
            onChange={onChange}
            onBlur={onBlur}
            onKeyDown={onKeyDown}
          />
        </div>

        <div className="ms-2 checbox-text text-truncate ">{children}</div>
      </div>
    )
  }
)
CheckboxInput.displayName = 'CheckboxInput'
export default CheckboxInput

// const CheckboxInput = React.forwardRef<HTMLInputElement, CheckboxProps>(
//   (props, ref) => {
//     const { formName, label, errors, register, disabled, ...rest } = props
//     const formHasError = errors ? errors[formName] : null
//     return (
//       <div
//         className={`al-input-wrapper al-input-checkbox-container align-self-center`}
//         style={{ display: 'inline-block' }}
//       >
//         <input
//           className={`
//             al-input-check-box
//             ${formHasError && 'ai-form-input-error'}
//             ${disabled && 'al-input-disabled'}`}
//           type={'checkbox'}
//           ref={ref}
//           disabled={disabled}
//           {...register}
//           {...rest}
//         />
//         {label && (
//           <label
//             className={`
//             al-input-checkbox-label
//             ms-2
//                 ${disabled && 'al-input-disabled'}`}
//           >
//             {label}
//           </label>
//         )}
//         {errors && (
//           <ErrorMessage
//             errors={errors}
//             name={formName}
//             render={({ message }) => (
//               <div className="al-form-error-icon">
//                 {camelCaseSeparator(message)}
//               </div>
//             )}
//           />
//         )}
//       </div>
//     )
//   }
// )
// CheckboxInput.displayName = 'CheckboxInput'
// export default CheckboxInput
