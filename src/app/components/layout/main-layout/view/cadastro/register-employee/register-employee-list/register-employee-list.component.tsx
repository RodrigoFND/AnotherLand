import './register-employee-list.component.scss'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../../../../../../store/hooks'
import { RegisterEmployee } from '../../../../../../../model/Register/register-employee/register-employee.models'
import useRolePermission from '../../../../../../../shared/hooks/use-role-permission'
import { Props } from '../../../../../../../model/root/root-model'
import CustomBreadcrumbComponent from '../../../../../../../shared/components/breadcrumb/custom-breadcrumb.component'
import { Button, Col, Container, Dropdown, Row } from 'react-bootstrap'
import { DataGrid, GridColDef, GridRowParams } from '@mui/x-data-grid'
import { RiLockPasswordFill } from 'react-icons/ri'
Dropdown

const EmployeeGrid = (employee: RegisterEmployee[]) => {
  // const handleClick = (event: React.MouseEvent<HTMLElement>) => {
  //   event.stopPropagation()
  //   setAnchorEl(event.currentTarget);
  // };
  // const handleClose = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>,values) => {
  //   e.stopPropagation()
  //   console.log(values)
  // };

  const columns: GridColDef[] = [
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
      headerName: 'Actions',
      sortable: false,
      width: 200,
      headerAlign: 'center',
      align: 'center',
      renderCell: () => {
        // const onClick = (e: InputEvent) => {}
        return (
          <div className="al-dropdown">
            <RiLockPasswordFill />
            <div className="al-dropdown-content">Teste</div>

            {/* <div
            className="d-flex justify-content-between align-items-center"
            style={{ cursor: "pointer" }}
          >
            <div onClick={handleClick} className='al-icon-click d-inline' 
               id="fade-button"
               aria-controls={open ? 'fade-menu' : undefined}
               aria-haspopup="true"
               aria-expanded={open ? 'true' : undefined}>
                  <BsThreeDotsVertical size={20} 
             />
               </div>
               <Menu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
          </div> */}
          </div>
        )
      },
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
        rows={employee}
        onRowClick={onRowClick}
        getRowClassName={(params) => {
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

      <Container fluid className="al-form p-4">
        <Row>
          <Col className="al-register-employee-datagrid">
            {EmployeeGrid(employees)}
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default RegisterEmployeeListComponent
