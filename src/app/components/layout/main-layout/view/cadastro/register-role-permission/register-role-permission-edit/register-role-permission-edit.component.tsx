import './register-role-permission-edit.component.scss'
import { useNavigate } from 'react-router-dom'
import { ERoles } from '../../../../../../../model/auth/auth.models'
import { Props } from '../../../../../../../model/root/root-model'
import { toastWarning } from '../../../../../../../shared/components/toast/toast.component'
import useRolePermission from '../../../../../../../shared/hooks/use-role-permission'
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../../store/hooks'
import * as yup from 'yup'
import {
  MCustomPermission,
  MRegisterRolePermission,
  MRolePermission,
} from '../../../../../../../model/Register/register-role-permission/register-role-permission.model'
import { RegisterRolePermissionAction } from '../../../../../../../store/register/register-role-permission-state/register-role-permission.reducer'
import CustomBreadcrumbComponent from '../../../../../../../shared/components/breadcrumb/custom-breadcrumb.component'
import { Button, Container, Row, Col } from 'react-bootstrap'
import { yupResolver } from '@hookform/resolvers/yup'
import { FieldValues, useForm } from 'react-hook-form'
import TextInput from '../../../../../../../shared/components/input/text-input/text-input.component'
import { useEffect, useState } from 'react'
import SearchInputMuiDataGrid from '../../../../../../../shared/components/input/search-input-mui-datagrid/search-input-mui-datagrid.component'
import './register-role-permission-edit.component.tsx'
import RolePermissionGrid from './elements/permission-edit-grid/permission-edit-grid.component'

const form = yup.object({
  id: yup.number().required(),
  description: yup.string().required(),
  pagesPermission: yup.array(),
})

function RegisterRolePermissionEditComponent(props: Props) {
  const { tree, header } = props
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const checkRolesPermission = useRolePermission()
  const role = useAppSelector(
    (state) => state.registerRolePermission.rolePermission
  )
  const [canEditDataGrid, setCanEditDataGrid] = useState(false)
  const {
    register,
    getValues,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(form),
  })
  const [gridFilter, setGridFilter] = useState(null)
  const [permissionsDataGridRows, setPermissionsDataGridRows] = useState([])

  useEffect(() => {
    if (role) {
      inicializeForm()
      inicializeDataGrid()
      checkCanEditPermission()
    }
  }, [role])

  const inicializeForm = () => {
    setValue('id', role.id)
    setValue('description', role.description)
    setValue('pagesPermission', role.pagesPermission)
  }

  const inicializeDataGrid = () => {
    const customPagePermission = role.pagesPermission.map((permission) => {
      const customPermission = {
        id: permission.id,
        path: permission.path,
        canRead: permission.roles.find((r) => r == ERoles.READ) != null,
        canAdd: permission.roles.find((r) => r == ERoles.ADD) != null,
        canEdit: permission.roles.find((r) => r == ERoles.EDIT) != null,
        canRemove: permission.roles.find((r) => r == ERoles.REMOVE) != null,
      }
      return customPermission
    })
    setPermissionsDataGridRows(customPagePermission)
  }

  const checkCanEditPermission = () => {
    const isRoleAdmin = role.id == 1
    if (isRoleAdmin) {
      setCanEditDataGrid(false)
      return
    }
    if (checkRolesPermission(ERoles.EDIT)) {
      setCanEditDataGrid(true)
    } else {
      setCanEditDataGrid(false)
    }
  }

  const getChangeCustomPermissionToPermission = (
    role: MCustomPermission
  ): MRolePermission => {
    const roles: ERoles[] = []
    if (role.canAdd) {
      roles.push(ERoles.ADD)
    }
    if (role.canEdit) {
      roles.push(ERoles.EDIT)
    }
    if (role.canRead) {
      roles.push(ERoles.READ)
    }
    if (role.canRemove) {
      roles.push(ERoles.REMOVE)
    }
    const permission: MRolePermission = {
      id: role.id,
      path: role.path,
      roles: roles,
    }
    return permission
  }

  const updatePermissionForm = (role: MCustomPermission) => {
    let permissions: MRolePermission[] = getValues('pagesPermission')
    const newPermission = getChangeCustomPermissionToPermission(role)
    permissions = permissions.filter((p) => p.id != newPermission.id)
    permissions.push(newPermission)
    setValue('pagesPermission', permissions)
  }

  const updateRolePermission = (roleUpdated: MRegisterRolePermission) => {
    if (!checkRolesPermission(ERoles.EDIT)) {
      toastWarning("User doesn't have permission to update role permission")
      return
    }
    dispatch(
      RegisterRolePermissionAction.updateRegisterRolePermission(roleUpdated)
    )
      .unwrap()
      .then(() => {
        goBackPage()
      })
      .catch(() => {
        return
      })
  }

  const goBackPage = () => {
    navigate(`../`)
  }

  const onSubmit = (data: FieldValues) => {
    const roleData = data as MRegisterRolePermission
    updateRolePermission(roleData)
  }

  return (
    <>
      <CustomBreadcrumbComponent
        tree={tree}
        header={header + ': ' + role?.description}
      >
        <Button className="al-btn-md al-btn-transparent" onClick={goBackPage}>
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
            <Col sm={3} lg={2} xl={2} className="mb-3">
              <TextInput
                label="Id"
                placeholder="Id"
                {...register('id')}
                onKeyDown={(e) => e.preventDefault()}
                disabled
              />
            </Col>

            <Col sm={9} lg={10} xl={10} className="mb-3">
              <TextInput
                label="Role name"
                placeholder="Enter a role description"
                {...register('description')}
                name="description"
                errors={errors}
              />
            </Col>
          </Row>
          <Row className="pt-3">
            <Col sm={8} lg={5} xl={3} className="pt-3 mb-3">
              <SearchInputMuiDataGrid
                columnFieldToSearch={'path'}
                setFilter={setGridFilter}
              />
            </Col>
            <Col sm={12} className="al-role-permission-edit-grid-datagrid">
              <RolePermissionGrid
                onRowChanges={updatePermissionForm}
                isEditPermited={canEditDataGrid}
                permissions={permissionsDataGridRows}
                filter={gridFilter}
              />
            </Col>
          </Row>
        </Container>
      </form>
    </>
  )
}

export default RegisterRolePermissionEditComponent
