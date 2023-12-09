import { MenuTabs } from "src/app/models/menu-tabs";


export const sideMenu : MenuTabs[] = [
  {
    label: 'Panel de control',
    icon: 'dashboard',
    path: 'dashboard',
    active: false,
    child: null
  },
  {
    label: 'Pacientes',
    icon: 'people',
    path: 'patient',
    active: false,
    child: null
  },
  {
    label: 'Consultas',
    icon: 'format_list_bulleted',
    path: 'consultations',
    active: false,
    child: null
  }
];