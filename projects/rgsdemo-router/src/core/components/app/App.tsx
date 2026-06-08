import { Layout } from "@core/components/layout/layout.tsx";
import { Router } from "@core/router/router";
import type { MenuOption } from "@core/types/menu-options";
import './App.css'

const getOptions = (): MenuOption[] => {
  return [
    {
      path: '/home',
      label: 'Home',
    },
    {
      path: '/movies',
      label: 'Movies',
    },
    {
      path: '/about',
      label: 'About',
    },


  ]
}

export const App: React.FC = () => {
  const title = 'Films with Rocío';
  const menuOptions: MenuOption[] = getOptions();

  return (
    <Layout title={title} menuOptions={menuOptions}>
      <Router/>  
    </Layout>   
  )
}




