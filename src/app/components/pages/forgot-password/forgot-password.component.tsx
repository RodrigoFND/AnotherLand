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
import './forgot-password.component.scss'

const formSchema = yup.object().shape({
  email: yup.string().required(),
})

function ForgotPasswordComponent() {
  const dispatch = useAppDispatch()
  const navigation = useNavigate()
  const redirectionTime = 10
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
    isEmailSended &&
      redirectCountDown > 0 &&
      setTimeout(() => {
        setRedirectCountDown(redirectCountDown - 1)
      }, 1000)
  }, [redirectCountDown, isEmailSended])

  useEffect(() => {
    if (redirectCountDown <= 0) {
      redirectToMainPage()
    }
  }, [redirectCountDown])

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
          </Col>
        </Row>
        <Row className=" w-100 text-center justify-content-center">
          <Col sm={10} md={6} lg={5} xl={4} xxl={4}>
            <Row className=" al-input-container justify-content-center py-4">
              {isEmailSended && (
                <Col className="al-form-group mb-3" sm={12}>
                  <div className="al-login-links">
                    A link for reset the password was sended.
                  </div>
                  <div className="al-login-links">
                    If you can&apos;t see the email, check on your span folder.
                  </div>
                  <div className="al-login-links">
                    Redirecting in: {redirectCountDown}
                  </div>
                </Col>
              )}

              {!isEmailSended && (
                <>
                  <Col className="al-form-group mb-3" sm={12}>
                    <TextInput
                      placeholder="Enter the recovery e-mail"
                      {...register('email')}
                      name="email"
                      errors={errors}
                      icon={<AiFillMail />}
                    />
                  </Col>
                  <Col className="al-form-group" sm={8}>
                    <Button
                      className="al-btn-lg al-btn-success"
                      type={'submit'}
                    >
                      Send
                    </Button>
                  </Col>
                </>
              )}
            </Row>
          </Col>
        </Row>
      </Container>
    </form>
  )
}

export default ForgotPasswordComponent
