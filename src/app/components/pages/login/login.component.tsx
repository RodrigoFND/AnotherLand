import { Col, Container, Row } from 'react-bootstrap'
import './login.scss'
import logo from '../../../assets/ANOTHER LAND ENTERTAINMENT_LOGO D.png'
import TextInput from '../../../shared/components/input/text-input/text-input.component'
import { AiOutlineUser } from 'react-icons/ai'
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
      className="login-view d-flex flex-column align-items-center justify-content-center"
    >
      <Row className="bg-warning w-100 text-center">
        <Col sm={12}>
          <picture>
            <source
              srcSet={'img_smallflower.jpg'}
              media={'(max-width: 400px)'}
            />
            <source srcSet={logo} />
            <img src={logo} alt={'Another land logo'} className="logo" />
          </picture>
        </Col>
      </Row>
      <Row className="bg-danger w-100 text-center">
        <Col className="" sm={3}>
          <TextInput icon={<AiOutlineUser />} />
        </Col>
        <Col className="" sm={12}>
          Teste
        </Col>
        <Col className="" sm={12}>
          Teste
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
