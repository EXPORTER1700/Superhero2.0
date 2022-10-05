import { useEffect, Suspense, useState } from 'react';
import { PublicRoutes } from 'routes/PublicRoutes';
import { AuthRoutes } from 'routes/AuthRoutes';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { setUser } from './store/user';
import { setStatistic } from './store/statistic';
import { Loader } from './components/Loader/Loader';

export const App = () => {
  const { user } = useAppSelector((state) => state.userReducer);
  const [isLoading, setIsLoading] = useState(true);
  const { playerStatistic, heroesStatistic } = useAppSelector(
    (state) => state.statisticReducer,
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    const userJSON = localStorage.getItem('user');

    if (userJSON) {
      const user = JSON.parse(userJSON);

      dispatch(setUser(user));
    }

    const statisticJSON = localStorage.getItem('statistic');

    if (statisticJSON) {
      const statistic = JSON.parse(statisticJSON);

      dispatch(setStatistic(statistic));
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem(
      'statistic',
      JSON.stringify({ playerStatistic, heroesStatistic }),
    );
  }, [playerStatistic, heroesStatistic]);

  if (isLoading) {
    return <Loader />;
  }

  return <Suspense>{user ? <AuthRoutes /> : <PublicRoutes />}</Suspense>;
};
