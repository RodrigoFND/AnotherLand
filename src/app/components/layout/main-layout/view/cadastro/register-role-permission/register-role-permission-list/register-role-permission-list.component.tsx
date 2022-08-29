import './register-role-permission-list.component.scss'
import { useNavigate } from 'react-router-dom'
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../../store/hooks'
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
import SearchInputMuiDataGrid from '../../../../../../../shared/components/input/search-input-mui-datagrid/search-input-mui-datagrid.component'
import { toastWarning } from '../../../../../../../shared/components/toast/toast.component'
import useRolePermission from '../../../../../../../shared/hooks/use-role-permission'
import { ERoles } from '../../../../../../../model/auth/auth.models'
import { MRegisterRolePermission } from '../../../../../../../model/Register/register-role-permission/register-role-permission.model'
import { RegisterRolePermissionAction } from '../../../../../../../store/register/register-role-permission-state/register-role-permission.reducer'
import RegisterRolePermissionAddComponent from '../register-role-permission-add/register-role-permission-add.component'

class MRegisterRolePermissionGrid extends MMuiDataGrid {
  roles: MRegisterRolePermission[]
  onRowRemoveClick: (role: MRegisterRolePermission) => void
}

const RolePermissionGrid = (props: MRegisterRolePermissionGrid) => {
  const { filter, roles, onRowClick, onRowRemoveClick } = props
  const columns: GridColumns<MRegisterRolePermission> = [
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
      field: 'actions',
      type: 'actions',
      minWidth: 50,
      headerName: 'Actions',
      getActions: (params: GridRowParams) => [
        <GridActionsCellItem
          key={0}
          onClick={() =>
            onRowRemoveClick(params.row as MRegisterRolePermission)
          }
          label="Delete"
          showInMenu
        />,
      ],
    },
  ]

  return (
    <>
      <DataGrid
        filterModel={filter || undefined}
        columns={columns}
        rows={roles}
        onRowClick={onRowClick}
        getRowClassName={() => {
          return 'al-cursor-pointer'
        }}
        sx={{
          borderRadius: 2,
          border: 0,
        }}
      />
    </>
  )
}

function RegisterRolePermissionListComponent(props: Props) {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const checkRolesPermission = useRolePermission()
  const rolesData = useAppSelector(
    (state) => state.registerRolePermission.rolesPermission
  )
  const [rolesDataGridRows, setRolesDataGridRows] =
    useState<MRegisterRolePermission[]>(rolesData)
  const [gridFilter, setGridFilter] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    setRolesDataGridRows(rolesData)
  }, [rolesData])

  const openRolesEditPage = (GridRowParams: GridRowParams) => {
    const employeeData = GridRowParams.row as MRegisterRolePermission
    navigate(`../${employeeData.id}`)
  }

  const deleteRole = (roleToDelete: MRegisterRolePermission) => {
    if (!checkRolesPermission(ERoles.REMOVE)) {
      toastWarning("User doesn't have permission to remove role permission")
      return
    }
    dispatch(
      RegisterRolePermissionAction.deleteRegisterRolePermission(roleToDelete.id)
    )
  }

  return (
    <>
      <CustomBreadcrumbComponent tree={props.tree} header={props.header}>
        <Button
          className="al-btn-md al-btn-success"
          onClick={() => setIsModalOpen(true)}
        >
          Add role permission
        </Button>
      </CustomBreadcrumbComponent>

      <RegisterRolePermissionAddComponent
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      ></RegisterRolePermissionAddComponent>

      <Container fluid className="al-form p-4">
        <Row>
          <Col sm={8} lg={5} xl={3} className="mb-3">
            <SearchInputMuiDataGrid
              columnFieldToSearch={'description'}
              columnFieldTypeNumberToSearch={'id'}
              setFilter={setGridFilter}
            />
          </Col>
          <Col sm={12} className="al-register-role-permission-datagrid">
            <RolePermissionGrid
              roles={rolesDataGridRows}
              filter={gridFilter}
              onRowClick={openRolesEditPage}
              onRowRemoveClick={deleteRole}
            />
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default RegisterRolePermissionListComponent
