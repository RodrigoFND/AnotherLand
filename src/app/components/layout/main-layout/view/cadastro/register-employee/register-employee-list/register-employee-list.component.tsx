import './register-employee-list.component.scss'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../../../../../../store/hooks'
import { RegisterEmployee } from '../../../../../../../model/Register/register-employee/register-employee.models'
import { MMuiDataGrid, Props } from '../../../../../../../model/root/root-model'
import CustomBreadcrumbComponent from '../../../../../../../shared/components/breadcrumb/custom-breadcrumb.component'
import { Button, Col, Container, Row } from 'react-bootstrap'
import {
  DataGrid,
  GridActionsCellItem,
  GridColumns,
  GridRowParams,
} from '@mui/x-data-grid'
import { useEffect, useState } from 'react'
import SearchInputMuiDataGrid from '../../../../../../../shared/components/input/search-input-mui-datagrid/search-input-mui-datagrid'

class MEmployeeGrid extends MMuiDataGrid {
  employees: RegisterEmployee[]
}

const EmployeeGrid = (props: MEmployeeGrid) => {
  const columns: GridColumns<RegisterEmployee> = [
    {
      field: 'id',
      headerName: 'Id',
      minWidth: 150,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'description',
      headerName: 'Description',
      minWidth: 150,
      flex: 1,
      editable: true,
    },
    {
      field: 'inactive',
      headerName: 'Inactive',
      minWidth: 90,
      flex: 0.3,
      type: 'boolean',
    },
    {
      field: 'actions',
      type: 'actions',
      minWidth: 50,
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
        filterModel={props?.filter || undefined}
        columns={columns}
        rows={props.employees}
        onRowClick={props?.onRowClick}
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
  const navigate = useNavigate()

  const employessData = useAppSelector(
    (state) => state.registerEmployee.employees
  )
  const [employeesDataGridRows, setEmployeesDataGridRows] =
    useState<RegisterEmployee[]>(employessData)
  const [gridFilter, setGridFilter] = useState(null)

  useEffect(() => {
    setEmployeesDataGridRows(employessData)
  }, [employessData])
  // const rolesPermission = useRolePermission()

  const openEmployeeEditPage = (GridRowParams: GridRowParams) => {
    const employeeData = GridRowParams.row as RegisterEmployee
    navigate(`../${employeeData.id}`)
  }

  const openAddPage = () => {
    navigate(`../add`, { replace: true })
  }

  return (
    <>
      <CustomBreadcrumbComponent tree={props.tree} header={props.header}>
        <Button
          className="al-btn-md al-btn-success"
          onClick={() => openAddPage()}
        >
          Add employee
        </Button>
      </CustomBreadcrumbComponent>

      <Container fluid className="al-form p-4">
        <Row>
          <Col sm={8} lg={5} xl={3} className="mb-3">
            <SearchInputMuiDataGrid
              columnFieldToSearch={'description'}
              columnFieldTypeNumberToSearch={'id'}
              setFilter={setGridFilter}
            />
          </Col>
          <Col sm={12} className="al-register-employee-datagrid">
            <EmployeeGrid
              employees={employeesDataGridRows}
              filter={gridFilter}
              onRowClick={openEmployeeEditPage}
            />
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default RegisterEmployeeListComponent
