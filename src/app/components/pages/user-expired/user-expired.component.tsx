import { useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { FieldValues, useForm } from 'react-hook-form'
import { UserLogin } from '../../../model/auth/auth.models'
import { AuthAction } from '../../../store/auth-state/auth.reducer'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'

function UserExpiredComponent() {
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.auth.user)
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm()

  useEffect(() => {
    const userName = user ? user.userName : ''
    setValue('userName', userName)
  }, [])

  const onSubmit = (data: FieldValues) => {
    const userData = data as UserLogin
    dispatch(AuthAction.loginWithPassword(userData))
  }
  console.log('Login')
  return (
    <div className="grid-container">
      <h1>User Expired</h1>
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

export default UserExpiredComponent
