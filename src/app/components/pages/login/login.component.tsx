import './login.scss'
import logo from '../../../assets/img/another-land-logo-with-name.png'
// import al from '../../../assets/img/al-icon.png'
import TextInput from '../../../shared/components/input/text-input/text-input.component'
import { AiOutlineUser } from 'react-icons/ai'
import { RiLockPasswordFill } from 'react-icons/ri'
import { FieldValues, useForm } from 'react-hook-form'
import { useAppDispatch } from '../../../store/hooks'
import { UserLogin } from '../../../model/auth/auth.models'
import { AuthAction } from '../../../store/auth-state/auth.reducer'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const formSchema = yup.object().shape({
  user: yup.string().required(),
  password: yup.string().required(),
})

function LoginComponent() {
  const dispatch = useAppDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  })

  const onSubmit = (data: FieldValues) => {
    const userData = data as UserLogin
    console.log(data)
    dispatch(AuthAction.loginWithPassword(userData))
  }
  console.log(errors)
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Container
        fluid
        className="login-view d-flex flex-column align-items-center justify-content-center al-login"
      >
        <Row className="w-100 text-center">
          <Col sm={12}>
            <picture>
              <source srcSet={logo} />
              <img src={logo} alt={'Another land logo'} className="logo" />
            </picture>
          </Col>
        </Row>

        <Row className=" w-100 text-center justify-content-center">
          <Col sm={10} md={6} lg={8} xl={4} xxl={3}>
            <Row className=" al-input-container justify-content-center py-4">
              <Col className="al-form-group mb-3" sm={12}>
                <TextInput
                  icon={<AiOutlineUser />}
                  register={register}
                  formName={'user'}
                />
              </Col>
              <Col className="al-form-group mb-3" sm={12}>
                <TextInput
                  register={register}
                  formName={'password'}
                  icon={<RiLockPasswordFill />}
                />
              </Col>
              <Col className="al-form-group" sm={8}>
                <Button className="al-lg-button" type={'submit'}>
                  Login
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>

        {/* <div className="grid-container">
        <form onSubmit={handleSubmit(onSubmit)}>
          User
          <input className="border" {...register('user')} />
          {errors.user?.message && <span>User is required</span>}
          <hr />
          Password
          <input className="border" {...register('password')} />
   
          <hr />
          <Button type={'submit'}>Login</Button>
          <hr />
        </form>
      </div> */}
      </Container>
    </form>
  )
}

export default LoginComponent
