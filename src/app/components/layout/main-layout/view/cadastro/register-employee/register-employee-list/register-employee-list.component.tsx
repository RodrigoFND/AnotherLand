import './register-employee-list.component.scss'
// import { useNavigate } from 'react-router-dom'
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../../store/hooks'
import {
  EmployeeType,
  RegisterEmployee,
} from '../../../../../../../model/Register/register-employee/register-employee.models'
import { Props } from '../../../../../../../model/root/root-model'
import CustomBreadcrumbComponent from '../../../../../../../shared/components/breadcrumb/custom-breadcrumb.component'
import { Button, Col, Container, Row } from 'react-bootstrap'
import {
  DataGrid,
  GridActionsCellItem,
  GridColumns,
  GridRowParams,
} from '@mui/x-data-grid'
import { useEffect, useState } from 'react'
import { RegisterEmployeeAction } from '../../../../../../../store/register/register-employee-state/register-employee.reducer'

function SearchInput(props: {
  employees: RegisterEmployee[]
  setEmployee: React.Dispatch<React.SetStateAction<RegisterEmployee[]>>
}) {
  // const [searched, setSearched] = useState<string>('')
  const requestSearch = (searchedVal: string) => {
    const filteredRows = props.employees.filter((row) => {
      const hasDescription = row.description
        .toLowerCase()
        .includes(searchedVal.toLowerCase())
      const hasCodigo = row.id.toString().includes(searchedVal)
      if (hasDescription || hasCodigo) {
        return true
      } else {
        return false
      }
    })
    props.setEmployee(filteredRows)
  }
  // const cancelSearch = () => {
  //   setSearched("");
  //   requestSearch(searched);
  // };
  return <input onChange={(e) => requestSearch(e.target.value)} />
}

function EmployeeGrid(props: { employees: RegisterEmployee[] }) {
  // const [searched, setSearched] = useState<string>('')
  const columns: GridColumns<RegisterEmployee> = [
    {
      field: 'id',
      headerName: 'Id',
      width: 150,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'description',
      headerName: 'Description',
      flex: 1,
      editable: true,
    },
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

  const employessData = useAppSelector(
    (state) => state.registerEmployee.employees
  )
  const dispatch = useAppDispatch()
  const [employeesDataGridRows, setEmployeesDataGridRows] =
    useState<RegisterEmployee[]>(employessData)

  useEffect(() => {
    console.log('Changes')
  }, [employessData])
  // const rolesPermission = useRolePermission()

  // const openEmployeeEditPage = (employeeId: number) => {
  //   navigate(`../${employeeId}`, { replace: true })
  // }

  // const openAddPage = () => {
  //   navigate(`../add`, { replace: true })
  // }
  const dispatchEmployee = () => {
    const data: RegisterEmployee = {
      id: 3232323232323232,
      description: 'teste',
      cpfCnpj: '232323232323',
      employeeType: EmployeeType.FISICA,
      phones: [],
      inactive: false,
    }
    console.log(data)
    dispatch(RegisterEmployeeAction.setEmployess(data))
  }
  return (
    <>
      <CustomBreadcrumbComponent tree={props.tree} header={props.header}>
        <Button className="al-btn-md al-btn-transparent">Go back</Button>
        <Button
          className="al-btn-md al-btn-success"
          onClick={() => dispatchEmployee()}
        >
          Add employee
        </Button>
      </CustomBreadcrumbComponent>

      <Container fluid className="al-form p-4">
        <Row>
          <Col sm={12} className="mb-3">
            <SearchInput
              employees={employessData}
              setEmployee={setEmployeesDataGridRows}
            />
          </Col>

          <Col sm={12} className="al-register-employee-datagrid">
            <EmployeeGrid employees={employeesDataGridRows} />
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default RegisterEmployeeListComponent
