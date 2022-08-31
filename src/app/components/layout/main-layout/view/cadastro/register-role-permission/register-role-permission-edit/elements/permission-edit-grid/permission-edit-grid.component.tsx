import './permission-edit-grid.component.scss'
import { DataGrid } from '@mui/x-data-grid/DataGrid/DataGrid'
import { GridColumns } from '@mui/x-data-grid/models'
import { MCustomPermission } from '../../../../../../../../../model/Register/register-role-permission/register-role-permission.model'
import { MMuiDataGrid } from '../../../../../../../../../model/root/root-model'

class MRegisterRolePermissionGrid extends MMuiDataGrid {
  permissions: MCustomPermission[]
  isEditPermited: boolean
  onRowChanges?: (data: MCustomPermission) => void
}

function RolePermissionGrid(props: MRegisterRolePermissionGrid) {
  const { filter, permissions, isEditPermited, onRowChanges } = props

  const columns: GridColumns<MCustomPermission> = [
    {
      field: 'path',
      headerName: 'Path',
      minWidth: 300,
      flex: 1,
    },
    {
      field: 'canRead',
      headerName: 'Read',
      minWidth: 150,
      type: 'boolean',
    },
    {
      field: 'canAdd',
      headerName: 'Add',
      minWidth: 150,
      type: 'boolean',
      editable: isEditPermited ? true : false,
      cellClassName: () => {
        return isEditPermited ? 'al-permission-edit-grid-row' : ''
      },
    },
    {
      field: 'canEdit',
      headerName: 'Edit',
      minWidth: 150,
      type: 'boolean',
      editable: isEditPermited ? true : false,
      cellClassName: () => {
        return isEditPermited ? 'al-permission-edit-grid-row' : ''
      },
    },
    {
      field: 'canRemove',
      headerName: 'Remove',
      minWidth: 150,
      type: 'boolean',
      editable: isEditPermited ? true : false,
      cellClassName: () => {
        return isEditPermited ? 'al-permission-edit-grid-row' : ''
      },
    },
  ]

  function CustomFooterComponent() {
    return (
      <div className="d-flex justify-items-end permission-edit-grid-footer">
        <h2 className="ms-auto ">
          <strong>
            * Double click the cell to edit status if you have permission
          </strong>
        </h2>
      </div>
    )
  }

  const afterRowChange = (row: MCustomPermission) => {
    if (onRowChanges) {
      onRowChanges(row)
    }
  }

  const processRowUpdate = (newRow: any) => {
    const updatedRow = { ...newRow, canRead: false }
    if (updatedRow.canEdit || updatedRow.canRemove || updatedRow.canAdd) {
      updatedRow.canRead = true
    } else {
      updatedRow.canRead = false
    }
    afterRowChange(updatedRow)
    return updatedRow
  }

  return (
    <>
      <DataGrid
        filterModel={filter || undefined}
        columns={columns}
        rows={permissions}
        disableSelectionOnClick
        processRowUpdate={processRowUpdate}
        experimentalFeatures={{ newEditingApi: true }}
        components={{
          Footer: CustomFooterComponent,
        }}
        sx={{
          borderRadius: 2,
          border: 0,
        }}
      />
    </>
  )
}

export default RolePermissionGrid
