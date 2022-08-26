import './reset-password.component.scss'
import logo from '../../../assets/img/another-land-logo-with-name.png'
import { RiLockPasswordFill } from 'react-icons/ri'
import { FieldValues, useForm } from 'react-hook-form'
import { useAppDispatch } from '../../../store/hooks'
import { AuthAction } from '../../../store/auth-state/auth.reducer'
import { Button, Col, Container, Row, Image } from 'react-bootstrap'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import TextInput from '../../../shared/components/input/text-input/text-input.component'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { UserService } from '../../../services/auth-service/user.service'
import { PuffLoader } from 'react-spinners'

const formSchema = yup.object().shape({
  password: yup.string().required(),
  confirmPassword: yup
    .string()
    .required()
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
})

function ResetPasswordComponent() {
  const dispatch = useAppDispatch()
  const navigation = useNavigate()
  const { id } = useParams()
  const redirectionTime = 10
  const [isPasswordReseted, setIsPasswordReseted] = useState(false)
  const [isTokenValid, setTokenValid] = useState(null)
  const [canStartExitCount, setCanStartExitCount] = useState(false)
  const [redirectCountDown, setRedirectCountDown] = useState(redirectionTime)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  })

  useEffect(() => {
    const verifyToken = async () => {
      const isTokenValid = await verifyTokenValid()
      if (isTokenValid) {
        setTokenValid(true)
      } else {
        setTokenValid(false)
        setCanStartExitCount(true)
      }
    }
    verifyToken()
  }, [])

  useEffect(() => {
    if (canStartExitCount) {
      startCounter()
    }
  }, [canStartExitCount, redirectCountDown])

  useEffect(() => {
    redirectToMainPage()
  }, [redirectCountDown])

  const verifyTokenValid = (): Promise<boolean> => {
    return new Promise((resolve) => {
      UserService.userVerifyResetToken(id)
        .then((res) => {
          if (res) {
            resolve(true)
          }
        })
        .catch(() => {
          resolve(false)
        })
    })
  }

  const startCounter = () => {
    if (redirectCountDown > 0) {
      setTimeout(() => {
        setRedirectCountDown(redirectCountDown - 1)
      }, 1000)
    }
  }

  const redirectToMainPage = () => {
    if (redirectCountDown <= 0) {
      navigation('/')
    }
  }

  const onSubmit = (data: FieldValues) => {
    const { password } = data
    const tokenId = Number.parseInt(id)
    dispatch(AuthAction.resetPassword({ tokenId: tokenId as number, password }))
      .unwrap()
      .then(() => {
        setIsPasswordReseted(true)
        setCanStartExitCount(true)
      })
      .catch(() => {
        setTokenValid(false)
        setCanStartExitCount(true)
      })
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
            {!isPasswordReseted && (
              <Row className=" al-input-container justify-content-center py-4">
                {isTokenValid && (
                  <>
                    <Col className="al-form-group mb-3" sm={12}>
                      <TextInput
                        placeholder="Enter the new password"
                        {...register('password')}
                        name="password"
                        errors={errors}
                        icon={<RiLockPasswordFill />}
                      />
                    </Col>
                    <Col className="al-form-group mb-3" sm={12}>
                      <TextInput
                        type={'password'}
                        placeholder="Confirm password"
                        {...register('confirmPassword')}
                        name="confirmPassword"
                        errors={errors}
                        icon={<RiLockPasswordFill />}
                      />
                    </Col>
                    <Col className="al-form-group" sm={8}>
                      <Button
                        className="al-btn-lg al-btn-success"
                        type={'submit'}
                      >
                        Reset password
                      </Button>
                    </Col>
                  </>
                )}
                {isTokenValid == false && (
                  <Col className="al-form-group" sm={8}>
                    <div className="al-login-links">
                      Link expired or invalid.
                    </div>
                    <div className="al-login-links">
                      Redirecting in: {redirectCountDown}
                    </div>
                  </Col>
                )}
                {isTokenValid == null && (
                  <Col
                    className="al-form-group d-flex justify-content-center"
                    sm={8}
                  >
                    <PuffLoader
                      loading={true}
                      color={'rgba(165, 7, 42)'}
                      size={90}
                    ></PuffLoader>
                  </Col>
                )}
              </Row>
            )}

            {isPasswordReseted && (
              <Row className=" al-input-container justify-content-center py-4">
                <Col className="al-form-group mb-3" sm={12}>
                  <div className="al-login-links">
                    Password changed successfully
                  </div>
                  <div className="al-login-links">
                    Redirecting in: {redirectCountDown}
                  </div>
                </Col>
              </Row>
            )}
          </Col>
        </Row>
      </Container>
    </form>
  )
}

export default ResetPasswordComponent
