import './register-employee-list.component.scss'
// import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../../../../../../store/hooks'
import { RegisterEmployee } from '../../../../../../../model/Register/register-employee/register-employee.models'
import { Props } from '../../../../../../../model/root/root-model'
import CustomBreadcrumbComponent from '../../../../../../../shared/components/breadcrumb/custom-breadcrumb.component'
import { Button, Col, Container, Row } from 'react-bootstrap'
import {
  DataGrid,
  GridActionsCellItem,
  GridColumns,
  GridRowParams,
} from '@mui/x-data-grid'

function EmployeeGrid(props: { employees: RegisterEmployee[] }) {
  const columns: GridColumns<RegisterEmployee> = [
    {
      field: 'id',
      headerName: 'Id',
      width: 150,
      headerAlign: 'center',
      align: 'center',
    },
    { field: 'description', headerName: 'Description', flex: 1 },
    { field: 'inactive', headerName: 'Inactive', flex: 0.3, type: 'boolean' },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      getActions: (params: GridRowParams) => [
        <GridActionsCellItem
          key={0}
          onClick={() => onRowClick(params)}
          label="Delete"
          showInMenu
        />,
      ],
    },
  ]
  const onRowClick = (params: GridRowParams) => {
    const rowData = params.row as RegisterEmployee
    console.log(rowData)
  }

  return (
    <>
      <DataGrid
        columns={columns}
        rows={props.employees}
        onRowClick={onRowClick}
        getRowClassName={() => {
          return 'al-register-employee-col'
        }}
        sx={{
          borderRadius: 2,
          border: 0,
        }}
      />
    </>
  )
}

function RegisterEmployeeListComponent(props: Props) {
  // const navigate = useNavigate()
  const employees: RegisterEmployee[] = useAppSelector(
    (state) => state.registerEmployee.employees
  )
  // const rolesPermission = useRolePermission()

  // const openEmployeeEditPage = (employeeId: number) => {
  //   navigate(`../${employeeId}`, { replace: true })
  // }

  // const openAddPage = () => {
  //   navigate(`../add`, { replace: true })
  // }
  return (
    <>
      <CustomBreadcrumbComponent tree={props.tree} header={props.header}>
        <Button className="al-btn-md al-btn-transparent">Go back</Button>
        <Button className="al-btn-md al-btn-success">Add employee</Button>
      </CustomBreadcrumbComponent>

      <Container fluid className="al-form p-4">
        <Row>
          <Col className="al-register-employee-datagrid">
            <EmployeeGrid employees={employees} />
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default RegisterEmployeeListComponent
