import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { RegisterEmployee } from '../../../../../../../model/Register/register-employee/register-employee.models'
import { useAppDispatch } from '../../../../../../../store/hooks'
import { RegisterEmployeeAction } from '../../../../../../../store/register/register-employee-state/register-employee.reducer'

function RegisterEmployeeEditComponent() {
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
    <div>
      <div> {employee ? employee.description : 'Nenhum Encontrado'}</div>
    </div>
  )
}

export default RegisterEmployeeEditComponent
