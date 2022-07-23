import {
  createSlice,
  createAsyncThunk,
  ActionReducerMapBuilder,
} from '@reduxjs/toolkit'
import axios from 'axios'
import {
  EmployeeType,
  RegisterEmployee,
} from '../../model/register-employee/register-employee.models'
import { API_URL } from '../../services/service'

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

const namespace = 'registerEmployeeSlice'

const getRegisterEmployee = createAsyncThunk<RegisterEmployee[], void>(
  `${namespace}/getRegisterEmployee`,
  async () => {
    try {
      const res: RegisterEmployee[] = await fetch(
        `${API_URL}/cadastrocolaborador`
      ).then((res) => res.json())
      return res
    } catch (err) {
      console.log(err)
      throw err
    }
  }
)

const getRegisterEmployeeById = createAsyncThunk<RegisterEmployee, number>(
  `${namespace}/getRegisterEmployeeById`,
  async (userId) => {
    try {
      const { data } = await axios(`${API_URL}/cadastrocolaborador/${userId}`)
      return data as RegisterEmployee
    } catch (err) {
      console.log(err)
      throw err
    }
  }
)

const getRegisterEmployeeBuilder = (
  builder: ActionReducerMapBuilder<RegisterEmployeeState>
): ActionReducerMapBuilder<RegisterEmployeeState> => {
  return builder
    .addCase(getRegisterEmployee.fulfilled, (state, { payload }) => {
      state.employees = payload
      console.log(state)
    })
    .addCase(getRegisterEmployee.pending, () => {
      console.log('Pending')
    })
    .addCase(getRegisterEmployee.rejected, () => {
      console.log('Rejected')
    })
}

const getRegisterEmployeeByIdBuilder = (
  builder: ActionReducerMapBuilder<RegisterEmployeeState>
): ActionReducerMapBuilder<RegisterEmployeeState> => {
  return builder
    .addCase(getRegisterEmployeeById.fulfilled, (state, { payload }) => {
      state.employee = payload
    })
    .addCase(getRegisterEmployeeById.pending, () => {
      console.log('getRegisterEmployeeById - Pending')
    })
    .addCase(getRegisterEmployeeById.rejected, () => {
      console.log('getRegisterEmployeeById - rejected')
    })
}

const registerEmployeeSlice = createSlice({
  name: namespace,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    getRegisterEmployeeBuilder(builder)
    getRegisterEmployeeByIdBuilder(builder)
  },
})

export default registerEmployeeSlice.reducer
export const {} = registerEmployeeSlice.actions

export const RegisterEmployeeAction = {
  ...registerEmployeeSlice.actions,
  getRegisterEmployee,
  getRegisterEmployeeById,
}
