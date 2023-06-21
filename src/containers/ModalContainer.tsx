import React from 'react'
import { Transition } from '@headlessui/react'
import { useDispatch, useSelector } from 'react-redux'

import { getModaltSelector } from '@/store/selectors/modalSelector'
import { MODALS } from '@/constants/modals'
import { closeModal } from '@/store/slices/modalSlice'
import { IconWrappedComponent } from '@/wrappers/IconWrappedComponent'

export const ModalContainer = () => {
  const dispatch = useDispatch()
  const { hasContent, componentKey, componentProps, containerConfig } =
    useSelector(getModaltSelector)

  const renderComponent = () => {
    if (!componentKey) {
      return null
    }

    const Component = MODALS[componentKey]

    return <Component {...componentProps} />
  }

  const getModalContentStyles = () => {
    let styles = 'modal-content'

    const { fullHeight } = containerConfig

    if (fullHeight) {
      styles = styles.concat(' full-height')
    }

    return styles
  }

  const getTransitionsProps = () => {
    switch (containerConfig.modalAlign) {
      case 'end':
        return {
          enter:
            'transform transition ease-in-out duration-500 sm:duration-700',
          enterFrom: 'translate-x-full',
          enterTo: 'translate-x-0',
          leave:
            'transform transition ease-in-out duration-500 sm:duration-700',
          leaveFrom: 'translate-x-0',
          leaveTo: 'translate-x-full',
        }
      case 'center':
        return {
          enter: 'ease-out duration-300',
          enterFrom: 'ease-out duration-300',
          enterTo: 'opacity-100',
          leave: 'ease-in duration-200',
          leaveFrom: 'opacity-100',
          leaveTo: 'opacity-0',
        }
    }
  }

  const handleCloseModal = () => dispatch(closeModal(null))

  const alignStyles = [
    containerConfig.modalAlign,
    containerConfig.modalAlign === 'center' ? 'min-h-full' : '',
  ]
    .join(' ')
    .trim()

  return (
    <Transition.Root show={hasContent} as={React.Fragment}>
      <div className="modal-container">
        <Transition.Child
          as={React.Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="modal-overlay overlay-bg" />
        </Transition.Child>

        <div className="dialog-panel-container">
          <div className={alignStyles}>
            <Transition.Child as={React.Fragment} {...getTransitionsProps()}>
              <div className={getModalContentStyles()}>
                {!containerConfig.hideCloseIcon && (
                  <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                    <button
                      type="button"
                      className="close-button"
                      role="close-button"
                      onClick={handleCloseModal}
                    >
                      <span className="sr-only">Close</span>
                      <IconWrappedComponent
                        className="h-6 w-6"
                        iconName="X_ICON"
                      />
                    </button>
                  </div>
                )}
                {renderComponent()}
              </div>
            </Transition.Child>
          </div>
        </div>
      </div>
    </Transition.Root>
  )
}
