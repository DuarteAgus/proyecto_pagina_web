import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import AuthProvider from '@contexts/AuthContext';
import GamesProvider from '@contexts/GamesContext';

import Menu from '@components/Menu';
import Footer from '@components/Footer';

import Inicio from '@pages/Inicio';
import JuegosLista from '@pages/JuegosLista';
import Registro from '@pages/Registro';
import Ofertas from '@pages/Ofertas';
import Orden from '@pages/Orden';

import LoginCliente from './cliente/LoginCliente';
import DashboardCliente from './cliente/DashboardCliente';


import LoginAdmin from './admin/LoginAdmin';
import DashboardAdmin from './admin/DashboardAdmin';
import AdminClientes from './admin/AdminClientes';
import AdminPlanes from './admin/AdminPlanes';
import AdminJuegos from './admin/AdminJuegos';

import ProtectedRoute from '@components/ProtectedRoute';

export default function App() {
  return (
    <AuthProvider>
      <GamesProvider>
        <BrowserRouter>
          <div className="app-shell">
            <Menu />
            <main className="app-main">
              <Routes>
                <Route path="/" element={<Inicio />} />
                <Route path="/juegos" element={<JuegosLista />} />
                <Route path="/registro" element={<Registro />} />
                <Route path="/ofertas" element={<Ofertas />} />
                <Route path="/orden/:planId" element={<Orden />} />

                <Route path="/login-cliente" element={<LoginCliente />} />
                <Route path="/login-admin" element={<LoginAdmin />} />

                <Route
                  path="/dashboard-cliente"
                  element={
                    <ProtectedRoute allowedRoles={['cliente']}>
                      <DashboardCliente />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/dashboard-admin"
                  element={
                    <ProtectedRoute allowedRoles={['admin']}>
                      <DashboardAdmin />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/clientes"
                  element={
                    <ProtectedRoute allowedRoles={['admin']}>
                      <AdminClientes />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/planes"
                  element={
                    <ProtectedRoute allowedRoles={['admin']}>
                      <AdminPlanes />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/juegos"
                  element={
                    <ProtectedRoute allowedRoles={['admin']}>
                      <AdminJuegos />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="*"
                  element={<div className="text-white p-4">Página no encontrada</div>}
                />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </GamesProvider>
    </AuthProvider>
  );
}
