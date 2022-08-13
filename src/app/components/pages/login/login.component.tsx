import './login.scss'
import logo from '../../../assets/img/another-land-logo-with-name.png'
// import al from '../../../assets/img/al-icon.png'
import { AiOutlineUser } from 'react-icons/ai'
import { RiLockPasswordFill } from 'react-icons/ri'
import { FieldValues, useForm } from 'react-hook-form'
import { useAppDispatch } from '../../../store/hooks'
import { UserLogin } from '../../../model/auth/auth.models'
import { AuthAction } from '../../../store/auth-state/auth.reducer'
import { Button, Col, Container, Row, Image } from 'react-bootstrap'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import TextInput from '../../../shared/components/input/text-input/text-input.component'
import { Link } from 'react-router-dom'

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
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Container
        fluid
        className="al-login-view d-flex flex-column align-items-center justify-content-center al-login"
      >
        <Row className="w-100 text-center al-logo-container">
          <Col sm={12}>
            <Image src={logo} className="al-logo"></Image>
            {/* <picture>
              <source srcSet={logo} />
              <img src={logo} alt={'Another land logo'} className="logo" />
            </picture> */}
          </Col>
        </Row>

        <Row className=" w-100 text-center justify-content-center">
          <Col sm={10} md={6} lg={5} xl={4} xxl={4}>
            <Row className=" al-input-container justify-content-center py-4">
              <Col className="al-form-group mb-3" sm={12}>
                <TextInput
                  placeholder="User or e-mail"
                  register={{ ...register('user') }}
                  formName="user"
                  errors={errors}
                  icon={<AiOutlineUser />}
                />
              </Col>
              <Col className="al-form-group mb-3 text-right" sm={12}>
                <TextInput
                  placeholder="Password"
                  register={{ ...register('password') }}
                  formName="password"
                  errors={errors}
                  icon={<RiLockPasswordFill />}
                  onBlur={(event) => {
                    console.log(event)
                  }}
                />
              </Col>
              <Col className="al-form-group mb-3 text-start " sm={12}>
                <Link to="/forgotpassword" className="al-login-links">
                  Forgot password
                </Link>
              </Col>

              <Col className="al-form-group" sm={8}>
                <Button className="al-lg-button" type={'submit'}>
                  Login
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </form>
  )
}

export default LoginComponent
