import alertReducer, {
  addAlertItem,
  addAlertItemArray,
  IAlert,
  removeAlertItem,
  removeAlertItemArray,
} from '../alertSlice'

const alertListMock: IAlert[] = [
  {
    type: 'SUCCESS',
    title: 'Success Alert title',
    value: 'success value',
  },
  {
    type: 'INFO',
    title: 'Info Alert title',
    value: 'Info value',
  },
  {
    type: 'WARNING',
    title: 'Warning Alert title',
    value: 'Warning value',
  },
]

describe('Test alertSlice reducer', () => {
  it('should add a item to the alertList when addAlertItem is called', () => {
    const previousState = {
      alertList: [],
    }
    const newAlertItem = alertListMock[0]
    expect(
      alertReducer(previousState, addAlertItem(newAlertItem)).alertList
    ).toStrictEqual([newAlertItem])
  })

  it('should concat alerts to the alertList when addAlertItemArray is called', () => {
    const previousState = {
      alertList: [alertListMock[0]],
    }
    const newAlertItemArray = alertListMock
    expect(
      alertReducer(previousState, addAlertItemArray(newAlertItemArray))
        .alertList
    ).toStrictEqual([...previousState.alertList, ...newAlertItemArray])
  })

  it('should remove a item from the alertList when removeAlertItem is called', () => {
    const previousState = {
      alertList: alertListMock,
    }
    const removeAlertItemObj = alertListMock[1]
    expect(
      alertReducer(previousState, removeAlertItem(removeAlertItemObj)).alertList
    ).toStrictEqual([alertListMock[0], alertListMock[2]])
  })

  it('should remove alerts from the alertList when removeAlertItemArray is called', () => {
    const previousState = {
      alertList: alertListMock,
    }
    const removeAlertItems = [alertListMock[0], alertListMock[2]]
    expect(
      alertReducer(previousState, removeAlertItemArray(removeAlertItems))
        .alertList
    ).toStrictEqual([alertListMock[1]])
  })
})
