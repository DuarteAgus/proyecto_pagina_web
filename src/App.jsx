// App.jsx
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import AuthProvider from '@contexts/AuthContext';
import ProtectedRoute from '@components/ProtectedRoute';

import Menu from '@components/Menu';
import Footer from '@components/Footer';

import Inicio from '@pages/Inicio';
import JuegosLista from '@pages/JuegosLista';
import Login from '@pages/Login';
import Dashboard from '@pages/Dashboard';
import Registro from '@pages/Registro';
import Ofertas from '@pages/Ofertas';

import Orden from '@pages/Orden';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="app-shell">
          <Menu />
          <main className="app-main">
            <Routes>
              <Route path="/" element={<Inicio />} />
              <Route path="/juegos" element={<JuegosLista />} />
              <Route path="/login" element={<Login />} />
              <Route path="/ofertas" element={<Ofertas />} />
              <Route path="/orden/:planId" element={<Orden />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route path="/registro" element={<Registro />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}
