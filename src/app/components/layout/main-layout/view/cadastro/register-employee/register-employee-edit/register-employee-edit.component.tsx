import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { RegisterEmployee } from '../../../../../../../model/Register/register-employee/register-employee.models'
import { Props } from '../../../../../../../model/root/root-model'
import CustomBreadcrumbComponent from '../../../../../../../shared/components/breadcrumb/custom-breadcrumb.component'
import { useAppDispatch } from '../../../../../../../store/hooks'
import { RegisterEmployeeAction } from '../../../../../../../store/register/register-employee-state/register-employee.reducer'

function RegisterEmployeeEditComponent(props: Props) {
  const { id } = useParams()
  const dispatch = useAppDispatch()
  const [employee, setEmployee] = useState<RegisterEmployee>(null)

  useEffect(() => {
    dispatch(
      RegisterEmployeeAction.getRegisterEmployeeById(Number.parseInt(id))
    ).then(({ payload }) => {
      const payloadData = payload as RegisterEmployee
      setEmployee(payloadData)
    })
  }, [])

  return (
    <>
      <CustomBreadcrumbComponent
        tree={props.tree}
        header={props.header + ': ' + employee?.description}
      ></CustomBreadcrumbComponent>
      <div>
        <div> {employee ? employee.description : 'Nenhum Encontrado'}</div>
      </div>
    </>
  )
}

export default RegisterEmployeeEditComponent
