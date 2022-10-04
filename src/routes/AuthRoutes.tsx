import { Navigate, Route, Routes } from 'react-router';
import { Layout } from 'pages/Layout';
import { HomePage } from 'pages/Home/HomePage';
import { HeroesPage } from 'pages/Heroes/HeroesPage';
import { BattlePage } from 'pages/Battle/BattlePage';
import { ProfilePage } from 'pages/Profile/ProfilePage';

export const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/heroes" element={<HeroesPage />} />
        <Route path="/battle" element={<BattlePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="*" element={<Navigate to={'/'} />} />
      </Route>
    </Routes>
  );
};
