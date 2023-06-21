import React from 'react'

import { useDispatch } from 'react-redux'

import { SVG_ICONS } from '@/constants/icons'
import { IconWrappedComponent } from '@/wrappers/IconWrappedComponent'
import { ButtonComponent } from '@/components/ButtonComponent'
import { closeModal } from '@/store/slices/modalSlice'

export type ILayoutVariant = 'primary' | 'secondary' | 'danger'
export type IAlignActions = 'center' | 'start' | 'end' | 'around'
export interface IModalLayoutProps {
  children: React.ReactNode
}
const ModalLayoutHOC = (props: IModalLayoutProps) => (
  <div className="modal-layout">{props.children}</div>
)

interface ITitleProps {
  title: string
}

interface IBodyProps {
  children: React.ReactNode
}

interface IFooterActionsProps {
  variant?: 'danger' | 'primary' | 'secondary' | 'white'
  alignActions?: IAlignActions
  submitLabel?: string
  cancelLabel?: string
  showCancel?: boolean
  onSubmit?: () => void
  onCancel?: () => void
}

interface IIConProps {
  iconName: keyof typeof SVG_ICONS
  iconClassName?: string
  className?: string
}

interface IModalLayoutMainProps {
  (props: IModalLayoutProps): JSX.Element
  Title: (props: ITitleProps) => JSX.Element
  Icon: (props: IIConProps) => JSX.Element
  Body: (props: IBodyProps) => JSX.Element
  FooterActions: (props: IFooterActionsProps) => JSX.Element
}

const Title = (props: ITitleProps) => (
  <h3 className="text-lg leading-6 font-medium text-gray-900">{props.title}</h3>
)

const Body = (props: IBodyProps) => <div className="body">{props.children}</div>

const FooterActions = (props: IFooterActionsProps) => {
  const dispatch = useDispatch()
  const {
    alignActions,
    onCancel,
    onSubmit,
    variant = 'primary',
    showCancel = true,
  } = props

  const getAlignStyle = () => {
    if (!alignActions) {
      return 'footer-actions end'
    }

    return 'footer-actions'.concat(` ${alignActions}`)
  }

  const handleCancel = () => {
    dispatch(closeModal(null))
    onCancel && onCancel()
  }

  return (
    <div className={getAlignStyle()}>
      {showCancel && (
        <ButtonComponent onClick={handleCancel} variant="white">
          {props.cancelLabel ?? 'Cancel'}
        </ButtonComponent>
      )}
      {onSubmit && (
        <ButtonComponent variant={variant} onClick={onSubmit}>
          {props.submitLabel ?? 'Submit'}
        </ButtonComponent>
      )}
    </div>
  )
}

const Icon = (props: IIConProps) => {
  const { className = '', iconClassName = '', iconName } = props
  const backgroundStyles = [
    'mx-auto flex items-center justify-center h-12 w-12 rounded-full',
    className,
  ]
    .join(' ')
    .trim()

  return (
    <div className={backgroundStyles}>
      <IconWrappedComponent
        className={iconClassName}
        iconName={iconName}
        role="modal-icon"
      />
    </div>
  )
}

ModalLayoutHOC.Title = Title
ModalLayoutHOC.Body = Body
ModalLayoutHOC.FooterActions = FooterActions
ModalLayoutHOC.Icon = Icon

export const ModalLayout: IModalLayoutMainProps = Object.assign(
  ModalLayoutHOC,
  {
    Icon,
    Title,
    Body,
    FooterActions,
  }
)
