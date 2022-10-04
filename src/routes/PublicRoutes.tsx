import { Navigate, Route, Routes } from 'react-router';
import { Layout } from 'pages/Layout';
import { RegistrationPage } from 'pages/Registration/RegistrationPage';
import { LoginPage } from 'pages/Login/LoginPage';

export const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to={'/login'} />} />
        <Route path={'/login'} element={<LoginPage />} />
        <Route path={'/registration'} element={<RegistrationPage />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Route>
    </Routes>
  );
};
