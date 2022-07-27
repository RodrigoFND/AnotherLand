import { unwrapResult } from '@reduxjs/toolkit'
import { Button } from 'react-bootstrap'
import { FieldValues, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { UserLogin } from '../../../model/auth/user.models'
import { userAction } from '../../../store/auth-state/user.reducer'
import { useAppDispatch } from '../../../store/hooks'

function LoginComponent() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = (data: FieldValues) => {
    const userData = data as UserLogin
    dispatch(userAction.login(userData))
      .then(unwrapResult)
      .then((res) => {
        if (res) {
          navigate('/')
        }
      })
  }
  return (
    <div className="grid-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          className="border"
          {...register('userName', { required: true })}
        />
        User
        <hr />
        <input
          className="border"
          {...register('password', { required: true })}
        />
        Password
        <hr />
        <Button type={'submit'}>Login</Button>
        <hr />
        {errors.exampleRequired && <span>This field is required</span>}
      </form>
    </div>
  )
}

export default LoginComponent
