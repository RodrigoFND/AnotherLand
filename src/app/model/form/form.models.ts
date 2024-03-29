import {
  DeepMap,
  FieldValues,
  Message,
  MultipleFieldErrors,
  Ref,
} from 'react-hook-form'

export type FieldError = {
  type: string
  ref?: Ref
  types?: MultipleFieldErrors
  message?: Message
}

export type FieldErrors<TFieldValues extends FieldValues = FieldValues> =
  DeepMap<TFieldValues, FieldError>
