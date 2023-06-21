import { removeLoaderItem, addLoaderItem } from '@/store/slices/loaderSlice'
import { handleLoader } from '../handleLoader'

describe('Handle loader tests', () => {
  const dispatchMock = jest.fn()
  const requestReference = 'some-ref'

  it('should return null (hideLoader)', () => {
    handleLoader({
      ref: requestReference,
      isRemove: true,
      hideLoader: true,
      dispatch: dispatchMock,
    })

    expect(dispatchMock).not.toHaveBeenCalledWith(
      removeLoaderItem(requestReference)
    )
  })

  it('should remove a loader item', () => {
    handleLoader({
      ref: requestReference,
      isRemove: true,
      hideLoader: false,
      dispatch: dispatchMock,
    })

    expect(dispatchMock).toHaveBeenCalledWith(
      removeLoaderItem(requestReference)
    )
  })

  it('should add a loader item', () => {
    handleLoader({
      ref: requestReference,
      isRemove: false,
      hideLoader: false,
      dispatch: dispatchMock,
    })

    expect(dispatchMock).toHaveBeenCalledWith(addLoaderItem(requestReference))
  })
})
