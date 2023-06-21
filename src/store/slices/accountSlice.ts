import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IUserInformation {
  id: number
  firstName: string
  lastName: string
  username: string
  email: string
}

export interface IAccountState {
  account: {
    user: IUserInformation
    token: string
  }
}

const initialAccountUser: IUserInformation = {
  id: 0,
  firstName: '',
  lastName: '',
  username: '',
  email: '',
}

export const initialAccountState: IAccountState = {
  account: {
    user: initialAccountUser,
    token: '',
  },
}

export const accountSlice = createSlice({
  name: 'account',
  initialState: initialAccountState,
  reducers: {
    setAccountUser: (state, { payload }: PayloadAction<IUserInformation>) => {
      state.account.user = payload
    },
    setAccountToken: (state, { payload }: PayloadAction<string>) => {
      state.account.token = payload
    },
    logout: (state) => {
      state.account.user = initialAccountUser
      state.account.token = ''
    },
  },
})

export const { setAccountUser, setAccountToken, logout } = accountSlice.actions
export default accountSlice.reducer
