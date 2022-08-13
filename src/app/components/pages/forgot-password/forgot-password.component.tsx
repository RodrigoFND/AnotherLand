import './forgot-password.component.scss'
import logo from '../../../assets/img/another-land-logo-with-name.png'
import { AiFillMail } from 'react-icons/ai'
import { FieldValues, useForm } from 'react-hook-form'
import { useAppDispatch } from '../../../store/hooks'
import { AuthAction } from '../../../store/auth-state/auth.reducer'
import { Button, Col, Container, Row, Image } from 'react-bootstrap'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import TextInput from '../../../shared/components/input/text-input/text-input.component'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const formSchema = yup.object().shape({
  email: yup.string().required().email(),
})

function ForgotPasswordComponent() {
  const dispatch = useAppDispatch()
  const navigation = useNavigate()
  const redirectionTime = 3
  let redirectionTimer: NodeJS.Timer = null
  const [isEmailSended, setEmailSended] = useState(false)
  const [redirectCountDown, setRedirectCountDown] = useState(redirectionTime)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  })

  useEffect(() => {
    if (isEmailSended) {
      startCounter()
    }
  }, [isEmailSended])

  useEffect(() => {
    if (redirectCountDown <= 0) {
      clearInterval(redirectionTimer)
      redirectToMainPage()
    }
    ;() => clearInterval(redirectionTimer)
  }, [redirectCountDown])

  const startCounter = () => {
    redirectionTimer = setInterval(() => {
      setRedirectCountDown(redirectionTime - 1)
    }, 1000)
  }

  const redirectToMainPage = () => {
    navigation('/')
  }

  const onSubmit = (data: FieldValues) => {
    const { email } = data
    dispatch(AuthAction.forgotPassword(email))
      .unwrap()
      .then(() => setEmailSended(true))
      .catch(() => setEmailSended(false))
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
                {!isEmailSended ? (
                  <TextInput
                    placeholder="Enter the recovery e-mail"
                    register={{ ...register('email') }}
                    formName="email"
                    errors={errors}
                    icon={<AiFillMail />}
                  />
                ) : (
                  <>
                    <div className="al-login-links">
                      A new password was sended
                    </div>
                    <div className="al-login-links">
                      Redirecting in: {redirectionTime}{' '}
                    </div>
                  </>
                )}
              </Col>

              <Col className="al-form-group" sm={8}>
                <Button className="al-lg-button" type={'submit'}>
                  Send
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </form>
  )
}

export default ForgotPasswordComponent
