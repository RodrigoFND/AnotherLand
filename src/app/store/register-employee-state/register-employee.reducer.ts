import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  EmployeeType,
  RegisterEmployee,
} from '../../model/register-employee/register-employee.models'

type RegisterEmployeeState = {
  employees: RegisterEmployee[]
  employee: RegisterEmployee
}

const initialState: RegisterEmployeeState = {
  employees: [
    {
      id: 1,
      description: `Rodrigo 1`,
      cpfCnpj: '037.723.721-39',
      employeeType: EmployeeType.FISICA,
      phones: [],
      inactive: false,
    },
  ],
  employee: null,
}

const registerEmployeeSlice = createSlice({
  name: 'registerEmployeeSlice',
  initialState,
  reducers: {
    getRegisterEmployee: (state) => {
      state.employees
    },
    getRegisterEmployeeById: (state, action: PayloadAction<number>) => {
      state.employee = state.employees.find(
        (employee) => employee.id == action.payload
      )
    },
    addRegisterEmployee: (state, action: PayloadAction<RegisterEmployee>) => {
      state.employees.push(action.payload)
    },
    deleteRegisterEmployee: (state, action: PayloadAction<number>) => {
      state.employees = state.employees.filter(
        (employee) => employee.id != action.payload
      )
    },
  },
})

export default registerEmployeeSlice.reducer
export const {
  getRegisterEmployee,
  getRegisterEmployeeById,
  addRegisterEmployee,
  deleteRegisterEmployee,
} = registerEmployeeSlice.actions
