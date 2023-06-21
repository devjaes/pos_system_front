import { createSelector } from '@reduxjs/toolkit'

import { IRootState } from '../store'

export const getUserAccountSelector = createSelector(
  (state: IRootState) => state.account,
  (account) => account.user
)
