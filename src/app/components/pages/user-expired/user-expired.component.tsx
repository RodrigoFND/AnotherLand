import { useEffect } from 'react'
import logo from '../../../assets/img/another-land-logo-with-name.png'
import { Button, Col, Container, Row, Image } from 'react-bootstrap'
import { FieldValues, useForm } from 'react-hook-form'
import { AiOutlineUser } from 'react-icons/ai'
import { RiLockPasswordFill } from 'react-icons/ri'
import { UserLogin } from '../../../model/auth/auth.models'
import TextInput from '../../../shared/components/input/text-input/text-input.component'
import { AuthAction } from '../../../store/auth-state/auth.reducer'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const formSchema = yup.object().shape({
  userName: yup.string().required(),
  password: yup.string().required(),
})

function UserExpiredComponent() {
  const user = useAppSelector((state) => state.auth.user)
  const dispatch = useAppDispatch()
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  })

  useEffect(() => {
    const userName = user ? user.userName : ''
    setValue('userName', userName)
  }, [])

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
          </Col>
        </Row>

        <Row className=" w-100 text-center justify-content-center">
          <Col sm={10} md={6} lg={5} xl={4} xxl={4}>
            <Row className=" al-input-container justify-content-center py-4">
              <Col
                className="al-form-group  text-center al-login-links mb-1 "
                sm={12}
              >
                Time out due inactivity. Please, login again.
              </Col>
              <Col className="al-form-group mb-3" sm={12}>
                <TextInput
                  placeholder="User or e-mail"
                  {...register('userName')}
                  name="userName"
                  errors={errors}
                  icon={<AiOutlineUser />}
                />
              </Col>
              <Col className="al-form-group mb-3 text-right" sm={12}>
                <TextInput
                  placeholder="Password"
                  type={'password'}
                  {...register('password')}
                  name="password"
                  errors={errors}
                  icon={<RiLockPasswordFill />}
                />
              </Col>

              <Col className="al-form-group" sm={8}>
                <Button className="al-btn-lg al-btn-success" type={'submit'}>
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

export default UserExpiredComponent
