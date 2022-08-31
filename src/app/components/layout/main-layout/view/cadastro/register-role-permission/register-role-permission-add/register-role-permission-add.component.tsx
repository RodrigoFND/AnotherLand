import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { MRegisterRolePermission } from '../../../../../../../model/Register/register-role-permission/register-role-permission.model'
import { Props } from '../../../../../../../model/root/root-model'
import ModalComponent from '../../../../../../../shared/components/modal/modal.component'
import { useAppDispatch } from '../../../../../../../store/hooks'
import { RegisterRolePermissionAction } from '../../../../../../../store/register/register-role-permission-state/register-role-permission.reducer'
import './register-role-permission-add.component.scss'
import * as yup from 'yup'
import { FieldValues, useForm } from 'react-hook-form'
import TextInput from '../../../../../../../shared/components/input/text-input/text-input.component'
import { useEffect } from 'react'
import { ERoles } from '../../../../../../../model/auth/auth.models'
import { toastWarning } from '../../../../../../../shared/components/toast/toast.component'
import useRolePermission from '../../../../../../../shared/hooks/use-role-permission'

const form = yup.object().shape({
  description: yup.string().required(),
})

interface RegisterRolePermissionAddProps extends Props {
  isModalOpen: boolean
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

function RegisterRolePermissionAddComponent(
  props: RegisterRolePermissionAddProps
) {
  const checkRolesPermission = useRolePermission()
  const { isModalOpen, setIsModalOpen } = props
  const dispatch = useAppDispatch()
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(form),
  })

  useEffect(() => {
    setValue('description', '')
  }, [isModalOpen])

  const addNewRole = (newRole: MRegisterRolePermission) => {
    if (!checkRolesPermission(ERoles.ADD)) {
      toastWarning("User doesn't have permission to add a new role permission")
      return
    }
    dispatch(RegisterRolePermissionAction.addRegisterRolePermission(newRole))
      .unwrap()
      .then(() => {
        setIsModalOpen(false)
      })
      .catch(() => {
        return
      })
  }

  const onSubmit = (data: FieldValues) => {
    const role = data as MRegisterRolePermission
    addNewRole(role)
  }

  return (
    <>
      <ModalComponent
        isModalOpen={isModalOpen}
        onCloseClick={() => setIsModalOpen(false)}
      >
        <div className="al-modal-header p-3">Register role permission</div>
        <div className="al-modal-body">
          <form>
            <Container fluid className="al-form py-4 m-0">
              <Row className="al-form-group">
                <Col sm={12} lg={12}>
                  <TextInput
                    label="Role name"
                    placeholder="Enter the role name"
                    {...register('description')}
                    name="description"
                    errors={errors}
                  />
                </Col>
              </Row>
            </Container>
          </form>
        </div>
        <div className="al-modal-footer p-3">
          <Button
            className=" ms-2 al-btn-md al-btn-transparent"
            onClick={() => setIsModalOpen(false)}
          >
            Close
          </Button>
          <Button
            className=" ms-2 al-btn-md al-btn-success"
            onClick={handleSubmit(onSubmit)}
          >
            Add role permission
          </Button>
        </div>
      </ModalComponent>
    </>
  )
}

export default RegisterRolePermissionAddComponent
