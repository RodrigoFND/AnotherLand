import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useAppSelector } from '../../../../../../store/hooks'
import { cpfCnpjValidation } from '../../../../../../utils/form/validation/cpf-cnpj-form-validation'
import { useEffect, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { FieldValues, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Props } from '../../../../../../model/root/root-model'
import {
  EmployeeTypeDescription,
  RegisterEmployee,
} from '../../../../../../model/Register/register-employee/register-employee.models'
import CustomBreadcrumbComponent from '../../../../../../shared/components/breadcrumb/custom-breadcrumb.component'
import TextInput from '../../../../../../shared/components/input/text-input/text-input.component'
import CpfCnpjInput from '../../../../../../shared/components/input/cpf-cnpj-input/cpf-cnpj-input.component'
import CheckboxInput from '../../../../../../shared/components/input/checkbox-input/checkbox-input.component'
import Select from '../../../../../../shared/components/input/select-input/select-input.component'
import PhoneInput from '../../../../../../shared/components/input/phone-input/phone-input.component'
import { ERoles } from '../../../../../../model/auth/auth.models'

const formSchema = yup.object().shape({
  pageERole: yup.number(),
  id: yup.number().strict(),
  description: yup.string().required(),
  email: yup.string().email().required(),
  cpfCnpj: yup
    .string()
    .required()
    .matches(cpfCnpjValidation.regex, cpfCnpjValidation.description),
  employeeType: yup.number().required(),
  phone: yup.string().required(),
  inactive: yup.boolean().required(),
  roleId: yup.number().required(),
  password: yup.string().when('pageERole', {
    is: ERoles.ADD,
    then: yup.string().required(),
  }),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
})

interface RegisterEmployeeProps extends Props {
  employee: RegisterEmployee
  onChangeEmployee?: (employee: RegisterEmployee) => void
}

function RegisterEmployeeComponent(props: RegisterEmployeeProps) {
  const navigate = useNavigate()
  const { employee, tree, header, eRole, onChangeEmployee } = props
  const roles = useAppSelector(
    (state) => state.registerRolePermission.rolesPermission
  )
  const user = useAppSelector((state) => state.auth.user)
  const [isUserAdmin, setIsUserAdmin] = useState(false)
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  })

  useEffect(() => {
    if (employee) {
      initializeForm()
    }
  }, [employee])

  useEffect(() => {
    const userAdmin = user.role.id == 1
    setIsUserAdmin(userAdmin)
  }, [user])

  useEffect(() => {
    if (employee) {
      initializeForm()
    }
  }, [employee])

  const initializeForm = () => {
    setValue('pageERole', eRole)
    setValue('id', employee.id)
    setValue('description', employee.description)
    setValue('email', employee.email)
    setValue('cpfCnpj', employee.cpfCnpj)
    setValue('employeeType', employee.employeeType)
    setValue('phone', employee.phone)
    setValue('inactive', employee.inactive)
    setValue('roleId', employee.roleId)
  }

  const goBackPage = () => {
    navigate(`../`)
  }

  const onSubmit = (data: FieldValues) => {
    if (!onChangeEmployee) {
      return
    }
    const userData = data as RegisterEmployee
    onChangeEmployee(userData)
  }

  return (
    <>
      <CustomBreadcrumbComponent tree={tree} header={header}>
        <Button className="al-btn-md al-btn-transparent" onClick={goBackPage}>
          Go back
        </Button>
        <Button
          className="al-btn-md al-btn-success"
          onClick={handleSubmit(onSubmit)}
        >
          {eRole == ERoles.ADD ? 'Add' : 'Save'}
        </Button>
      </CustomBreadcrumbComponent>
      <form>
        <Container fluid className="al-form p-3">
          <Row className="al-form-group">
            {eRole == ERoles.EDIT && (
              <Col sm={6} lg={2} xl={2} className="mb-3">
                <TextInput
                  label="Id"
                  placeholder="Id"
                  {...register('id')}
                  onKeyDown={(e) => e.preventDefault()}
                  disabled
                />
              </Col>
            )}

            <Col
              sm={6}
              lg={eRole == ERoles.ADD ? 7 : 5}
              xl={eRole == ERoles.ADD ? 7 : 5}
              className="mb-3"
            >
              <TextInput
                label="Employee name"
                placeholder="Enter a description"
                {...register('description')}
                name="description"
                errors={errors}
              />
            </Col>
            <Col sm={6} lg={5} xl={3} className="mb-3">
              <Select
                label="Role"
                placeholder="Enter the employee role"
                name="roleId"
                bindValue="id"
                bindLabel="description"
                errors={errors}
                {...register('roleId')}
                options={roles}
                disabled={!isUserAdmin}
              />
            </Col>
            <Col
              sm={6}
              lg={2}
              xl={2}
              className="mb-3 d-flex al-checkbox-center "
            >
              <CheckboxInput
                {...register('inactive')}
                name="inactive"
                errors={errors}
              >
                <>Employee Inactive</>
              </CheckboxInput>
            </Col>
            <Col sm={6} lg={5} xl={3} className="mb-3">
              <TextInput
                label="Email"
                placeholder="Enter the email"
                {...register('email')}
                name="email"
                errors={errors}
              />
            </Col>
            <Col sm={6} lg={5} xl={3} className="mb-3">
              <Select
                label="Type"
                placeholder="Enter the employee type"
                name="employeeType"
                bindValue="id"
                bindLabel="description"
                errors={errors}
                {...register('employeeType')}
                options={EmployeeTypeDescription}
                onKeyDown={(e) => {
                  if (!isUserAdmin) e.preventDefault
                }}
              />
            </Col>

            <Col sm={6} lg={4} xl={3} className="mb-3">
              <CpfCnpjInput
                label="CPF/CNPJ"
                placeholder="Enter a cpf/cnpj"
                {...register('cpfCnpj')}
                name="cpfCnpj"
                errors={errors}
              />
            </Col>

            <Col sm={6} lg={4} xl={3} className="mb-3">
              <PhoneInput
                label="Phone"
                placeholder="(99) 99999-9999"
                {...register('phone')}
                name="phone"
                errors={errors}
              />
            </Col>

            <Col sm={6} lg={4} xl={4} className="mb-3">
              <TextInput
                label="Password"
                type={'password'}
                placeholder="Enter the password"
                {...register('password')}
                name="password"
                errors={errors}
              />
            </Col>

            <Col sm={6} lg={4} xl={4} className="mb-3">
              <TextInput
                label="Confirm password"
                type={'password'}
                placeholder="Confirm the password"
                {...register('confirmPassword')}
                name="confirmPassword"
                errors={errors}
              />
            </Col>
          </Row>
        </Container>
      </form>
    </>
  )
}

export default RegisterEmployeeComponent
