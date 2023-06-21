export interface IAppNavigationItem {
  name: string
  href: string
  icon?: React.FC<React.ComponentProps<'svg'>>
}

export interface IAppNavigation extends IAppNavigationItem {
  child?: IAppNavigationItem[]
}

export const appNavigation: IAppNavigation[] = []
