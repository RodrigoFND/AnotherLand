import { useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { FieldValues, useForm } from 'react-hook-form'
import { UserLogin } from '../../../model/auth/auth.models'
import { AuthAction } from '../../../store/auth-state/auth.reducer'
import { useAppDispatch } from '../../../store/hooks'

function ForgotPasswordComponent() {
  const dispatch = useAppDispatch()
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm()

  useEffect(() => {
    setValue('userName', '')
  }, [])

  const onSubmit = (data: FieldValues) => {
    const userData = data as UserLogin
    dispatch(AuthAction.loginWithPassword(userData))
  }
  return (
    <div className="grid-container">
      <h1>Forgot password</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          className="border"
          {...register('userName', { required: true })}
        />
        User
        <hr />
        <Button type={'submit'}>Login</Button>
        <hr />
        {errors.exampleRequired && <span>This field is required</span>}
      </form>
    </div>
  )
}

export default ForgotPasswordComponent
