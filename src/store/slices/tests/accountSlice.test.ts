import accountReducer, {
  setAccountUser,
  setAccountToken,
  logout,
} from '../accountSlice'

const defaultState = {
  account: {
    user: {
      id: 0,
      firstName: '',
      lastName: '',
      username: '',
      email: '',
    },
    token: '',
  },
}

const accountUser = {
  id: 1,
  firstName: 'Tinkin',
  lastName: 'One',
  username: 'tinkin',
  email: 'user@tinkin.one',
}

describe('Test accountSlice reducer', () => {
  it('should return the initial state', () => {
    expect(accountReducer(undefined, { type: '' })).toEqual(defaultState)
  })

  it('should set account.user when setAccountUser is called', () => {
    expect(
      accountReducer(defaultState, setAccountUser(accountUser)).account.user
    ).toStrictEqual(accountUser)
  })

  it('should set account.token when setAccountToken is called', () => {
    expect(
      accountReducer(defaultState, setAccountToken('token')).account.token
    ).toBe('token')
  })

  it('should initialize account when when user logs out', () => {
    const accountData = {
      account: {
        user: accountUser,
        token: 'eyXhbGciOiJIUzI1Ro',
      },
    }
    expect(accountReducer(accountData, logout())).toStrictEqual(defaultState)
  })
})
