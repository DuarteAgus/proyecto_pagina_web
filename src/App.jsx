import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';

import { BrowserRouter, Routes , Route } from 'react-router-dom'

import AuthProvider from '@contexts/AuthContext';
import ProtectedRoute from '@components/ProtectedRoute';



import Inicio from '@pages/inicio';
import JuegosLista from '@pages/JuegosLista';
import JuegoItem from '@pages/JuegoItem';
import Login from '@pages/Login';
import Dashboard from '@pages/Dashboard';
import SobreNosotros from '@pages/SobreNosotros';
import Registro from '@pages/Registro';
import Menu from '@components/Menu';

export default function App() {
  return (
    <AuthProvider>
    <BrowserRouter>
    <Menu/>
    <Container>
      <Routes>
        <Route  path='/' element={<Inicio />} />
        <Route path='/juegos' element={<JuegosLista />} />
        <Route path='/juego/:id' element={<JuegoItem />} />
        <Route path='/nosotros' element={<SobreNosotros />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={
          <ProtectedRoute>
          <Dashboard />
          </ProtectedRoute>
        } />
        <Route path='/registro' element={<Registro />} />
      </Routes>
    </Container>
    </BrowserRouter>
    </AuthProvider>
  )
}
