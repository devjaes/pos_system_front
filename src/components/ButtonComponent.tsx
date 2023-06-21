const sizeEnum = {
  extraSmall: 'extra-small',
  small: 'small',
  medium: 'medium',
  large: 'large',
  extraLarge: 'extra-large',
} as const

const shapeEnum = {
  round: 'round',
  circular: 'circular',
} as const

export interface IButtonComponentProps {
  children: React.ReactNode
  size?: ReverseMap<typeof sizeEnum>
  shape?: ReverseMap<typeof shapeEnum>
  variant?: 'primary' | 'secondary' | 'white' | 'danger'
  startIcon?: React.FC<React.ComponentProps<'svg'>>
  endIcon?: React.FC<React.ComponentProps<'svg'>>
  extraClasses?: string
  onClick?: (e: React.MouseEvent<HTMLElement>) => void
  onSubmit?: (e: React.FormEvent<HTMLElement>) => void
  isAnchorButton?: boolean
  href?: string
}

const classShapeIcon = {
  [shapeEnum.round]: 'btn-round',
  [shapeEnum.circular]: 'btn-circular',
}

export const ButtonComponent = (props: IButtonComponentProps) => {
  const {
    size = 'medium',
    variant = 'primary',
    extraClasses = ``,
    shape = ``,
    startIcon: StartIcon,
    endIcon: EndIcon,
    children,
    isAnchorButton,
    href,
    onClick,
    onSubmit,
  } = props

  const className = [
    `button-component btn-${variant}-${size}`,
    shape ? classShapeIcon[shape] : '',
    extraClasses || '',
  ]
    .join(' ')
    .trim()

  const buttonComponentProps = {
    className,
    onClick,
    onSubmit,
  }

  const buttonContent = (
    <>
      {StartIcon && (
        <StartIcon className={`start-icon-${size}`} aria-hidden="true" />
      )}
      {children}
      {EndIcon && <EndIcon className={`end-icon-${size}`} aria-hidden="true" />}
    </>
  )

  return !isAnchorButton ? (
    <button {...buttonComponentProps}>{buttonContent}</button>
  ) : (
    <a href={href} {...buttonComponentProps}>
      {buttonContent}
    </a>
  )
}
