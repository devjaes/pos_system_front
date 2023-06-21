import { getUserAccountSelector } from '../accountSelector'
import { IRootState } from '@/store/store'

describe('Test accountSelector', () => {
  describe('When call getUserAccountSelector', () => {
    it('should return the account.user state', () => {
      const state = {
        account: {
          user: {
            id: 0,
            firstName: 'Alex',
            lastName: 'Arevalo',
            username: 'alex',
            email: 'alex@tinkin.one',
            token: 'token',
          },
        },
      } as IRootState

      expect(getUserAccountSelector(state)).toEqual(state.account.user)
    })
  })
})
