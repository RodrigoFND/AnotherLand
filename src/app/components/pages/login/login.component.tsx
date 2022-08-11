import './login.scss'
import logo from '../../../assets/img/another-land-logo-with-name.png'
// import al from '../../../assets/img/al-icon.png'
import TextInput from '../../../shared/components/input/text-input/text-input.component'
import { AiOutlineUser } from 'react-icons/ai'
import { RiLockPasswordFill } from 'react-icons/ri'
// import { FieldValues, useForm } from 'react-hook-form'
// import { useAppDispatch } from '../../../store/hooks'
// import { UserLogin } from '../../../model/auth/auth.models'
// import { AuthAction } from '../../../store/auth-state/auth.reducer'
import { Button, Col, Container, Row } from 'react-bootstrap'
function LoginComponent() {
  // const dispatch = useAppDispatch()
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm()

  // const onSubmit = (data: FieldValues) => {
  //   const userData = data as UserLogin
  //   dispatch(AuthAction.loginWithPassword(userData))
  // }
  console.log('Login')
  return (
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
        <Col sm={10} md={6} lg={6} xl={3}>
          <Row className=" al-input-container justify-content-center py-4">
            <Col className="al-form-group mb-3" sm={12}>
              <TextInput icon={<AiOutlineUser />} />
            </Col>
            <Col className="al-form-group mb-3" sm={12}>
              <TextInput icon={<RiLockPasswordFill />} />
            </Col>
            <Col className="al-form-group" sm={6}>
              <Button className="al-lg-button"> Login </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
    // <div className="grid-container">
    //   <form onSubmit={handleSubmit(onSubmit)}>
    //     <input
    //       className="border"
    //       {...register('userName', { required: true })}
    //     />
    //     User
    //     <hr />
    //     <input
    //       className="border"
    //       {...register('password', { required: true })}
    //     />
    //     Password
    //     <hr />
    //     <Button type={'submit'}>Login</Button>
    //     <hr />
    //     {errors.exampleRequired && <span>This field is required</span>}
    //   </form>
    // </div>
  )
}

export default LoginComponent
