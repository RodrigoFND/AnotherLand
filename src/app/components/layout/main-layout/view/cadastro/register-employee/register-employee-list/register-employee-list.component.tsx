import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../../../../../../store/hooks'
import { RegisterEmployee } from '../../../../../../../model/Register/register-employee/register-employee.models'
import useRolePermission from '../../../../../../../shared/hooks/use-role-permission'
import { ERoles } from '../../../../../../../model/auth/auth.models'
import { Props } from '../../../../../../../model/root/root-model'
import CustomBreadcrumbComponent from '../../../../../../../shared/components/breadcrumb/custom-breadcrumb.component'
import { Button, Col, Container, Row } from 'react-bootstrap'

function RegisterEmployeeListComponent(props: Props) {
  const navigate = useNavigate()
  const employees: RegisterEmployee[] = useAppSelector(
    (state) => state.registerEmployee.employees
  )
  const rolesPermission = useRolePermission()

  const openEmployeeEditPage = (employeeId: number) => {
    navigate(`../${employeeId}`, { replace: true })
  }

  const openAddPage = () => {
    navigate(`../add`, { replace: true })
  }
  return (
    <>
      <CustomBreadcrumbComponent tree={props.tree} header={props.header}>
        <Button className="al-btn-md al-btn-transparent">Go back</Button>
        <Button className="al-btn-md al-btn-success">Add employee</Button>
      </CustomBreadcrumbComponent>

      <Container fluid className="al-form p-3">
        <Row>
          <Col>
            <div>
              <div>
                <button onClick={() => openAddPage()}>Add</button>
                <button onClick={() => rolesPermission(ERoles.EDIT)}>
                  Check Permission
                </button>
              </div>
              {employees.map((employee) => (
                <div key={employee.id}>
                  <ul>
                    <li>Id: {employee.id}</li>
                    <li>Name: {employee.description}</li>
                    <li>Inativo: {employee.inactive}</li>
                  </ul>
                  <button onClick={() => openEmployeeEditPage(employee.id)}>
                    Acessar
                  </button>
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default RegisterEmployeeListComponent
