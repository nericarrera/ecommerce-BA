import Navbar from './Navbar'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'
import { useAppContext } from '../hooks/useAppContext';

function Layout() {

  const { cart } = useAppContext()

  return (
    <>
      <Navbar cart={cart} />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default Layout
