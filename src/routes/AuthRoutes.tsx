import { lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router';
import { Layout } from 'pages/Layout';
const HomePage = lazy(() => import('pages/Home/HomePage'));
const HeroesPage = lazy(() => import('pages/Heroes/HeroesPage'));
const BattlePage = lazy(() => import('pages/Battle/BattlePage'));
const ProfilePage = lazy(() => import('pages/Profile/ProfilePage'));
const HeroPage = lazy(() => import('pages/Hero/HeroPage'));

export const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="heroes" element={<HeroesPage />} />
        <Route path="battle" element={<BattlePage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="hero/:id" element={<HeroPage />} />
      </Route>
      <Route path="*" element={<Navigate to={'/'} />} />
    </Routes>
  );
};
