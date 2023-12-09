interface BaseMenuTabs {
    label: string
    icon: string
    path: string
    active: boolean
  }
  
  interface SubMenuTabs extends BaseMenuTabs { }
  
  export interface MenuTabs extends BaseMenuTabs {
    child: SubMenuTabs[] | null | undefined
  }