import { lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from 'pages/Layout';
const LoginPage = lazy(() => import('pages/Login/LoginPage'));
const RegistrationPage = lazy(
  () => import('pages/Registration/RegistrationPage'),
);

export const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to={'/login'} />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="registration" element={<RegistrationPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};
