import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { Props } from '../../../../../../../model/root/root-model'
import CustomBreadcrumbComponent from '../../../../../../../shared/components/breadcrumb/custom-breadcrumb.component'
import TextInput from '../../../../../../../shared/components/input/text-input/text-input.component'
import { useAppSelector } from '../../../../../../../store/hooks'
import * as yup from 'yup'
import { FieldValues, useForm } from 'react-hook-form'
import CheckboxInput from '../../../../../../../shared/components/input/checkbox-input/checkbox-input.component'
import Select from '../../../../../../../shared/components/input/select-input/select-input.component'
import PhoneInput from '../../../../../../../shared/components/input/phone-input/phone-input.component'
import CpfCnpjInput from '../../../../../../../shared/components/input/cpf-cnpj-input/cpf-cnpj-input.component'

const formSchema = yup.object().shape({
  id: yup.number().strict(),
  description: yup.string().required(),
  cpfCnpj: yup.string().required(),
  employeeType: yup.number().required(),
  phone: yup.string().required(),
  inactive: yup.boolean().required(),
  roleId: yup.number().required(),
})

function RegisterEmployeeEditComponent(props: Props) {
  const navigate = useNavigate()
  const employee = useAppSelector((state) => state.registerEmployee.employee)
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

  const initializeForm = () => {
    setValue('id', employee.id)
    setValue('description', employee.description)
    setValue('cpfCnpj', employee.cpfCnpj)
    setValue('employeeType', employee.employeeType)
    setValue('phone', employee.phone)
    setValue('inactive', employee.inactive)
    setValue('roleId', 3)
  }

  // const teste = () => {
  //   console.log(getValues('roleId'))
  // }

  const goBack = () => {
    navigate(`../`)
  }

  const onSubmit = (data: FieldValues) => {
    // const userData = data as RegisterEmployee
    console.log(data)
    // dispatch(AuthAction.loginWithPassword(userData))
  }

  return (
    <>
      <CustomBreadcrumbComponent
        tree={props.tree}
        header={props.header + ': ' + employee?.description}
      >
        <Button className="al-btn-md al-btn-transparent" onClick={goBack}>
          Go back
        </Button>
        <Button
          className="al-btn-md al-btn-success"
          onClick={handleSubmit(onSubmit)}
        >
          Save
        </Button>
      </CustomBreadcrumbComponent>
      <form>
        <Container fluid className="al-form p-4">
          <Row className="al-form-group">
            <Col sm={6} lg={2} xl={2} className="mb-3">
              <TextInput
                label="Id"
                placeholder="Id"
                {...register('id')}
                onKeyDown={(e) => e.preventDefault()}
                disabled
              />
            </Col>
            <Col sm={6} lg={6} xl={5} className="mb-3">
              <TextInput
                label="Employee name"
                placeholder="Enter a description"
                {...register('description')}
                name="description"
                errors={errors}
              />
            </Col>
            <Col sm={6} lg={4} xl={4} className="mb-3">
              <CpfCnpjInput
                label="CPF/CNPJ"
                placeholder="Enter a cpf/cnpj"
                {...register('cpfCnpj')}
                name="cpfCnpj"
                errors={errors}
              />
            </Col>
            <Col sm={6} lg={5} xl={1} className="mb-3 d-flex">
              <CheckboxInput
                label="Inactive"
                {...register('inactive')}
                name="inactive"
                errors={errors}
              />
            </Col>
            <Col sm={6} lg={5} xl={4} className="mb-3">
              <Select
                placeholder="Teste"
                name="roleId"
                bindValue="idade"
                bindLabel="nome"
                {...register('roleId')}
                options={[
                  { nome: 'Joao', idade: 3 },
                  { nome: 'Ana', idade: 7 },
                ]}
              />
            </Col>
            <Col sm={6} lg={5} xl={4} className="mb-3">
              <PhoneInput
                label="Phone"
                placeholder="(99) 99999-9999"
                {...register('phone')}
                name="phone"
                errors={errors}
              />
            </Col>
          </Row>
        </Container>
      </form>
    </>
  )
}

export default RegisterEmployeeEditComponent
