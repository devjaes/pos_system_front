import loaderReducer, { addLoaderItem, removeLoaderItem } from '../loaderSlice'

describe('Test loaderSlice reducer', () => {
  it('should add a item to the loader when addLoaderItem is called', () => {
    const previousState = {
      loader: [],
    }
    expect(
      loaderReducer(previousState, addLoaderItem('new item')).loader
    ).toStrictEqual(['new item'])
  })

  it('should remove a item from the loader when removeLoaderItem is called', () => {
    const previousState = {
      loader: ['old item1', 'old item2', 'old item3'],
    }
    expect(
      loaderReducer(previousState, removeLoaderItem('old item2')).loader
    ).toStrictEqual(['old item1', 'old item3'])
  })
})
