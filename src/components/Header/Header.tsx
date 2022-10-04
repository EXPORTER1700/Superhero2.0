import classes from 'components/Header/Header.module.scss';
import { ThemeSwitcher } from 'components/ThemeSwitcher/ThemeSwitcher';
import { useAppSelector } from 'hooks/redux';
import { Button } from 'components/Button/Button';
import { useNavigate } from 'react-router';
import { Search } from 'components/Search/Search';

const NotAuthButtonGroup = () => {
  const navigate = useNavigate();

  return (
    <nav className={classes.btnGroup}>
      <Button onClick={() => navigate('/login')}>LOGIN</Button>
      <Button onClick={() => navigate('/registration')}>REGISTRATION</Button>
    </nav>
  );
};

export const Header = () => {
  const { user } = useAppSelector((state) => state.userReducer);
  const navigate = useNavigate();
  return (
    <header className={classes.header}>
      <span onClick={() => navigate('/')} className={classes.logo}>
        SUPER<span>HERO</span>
      </span>
      {user && <Search />}
      {user ? (
        <Button onClick={() => navigate('/profile')}>{user.username}</Button>
      ) : (
        <NotAuthButtonGroup />
      )}
      <ThemeSwitcher />
    </header>
  );
};
