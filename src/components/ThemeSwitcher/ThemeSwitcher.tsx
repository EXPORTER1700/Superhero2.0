import classes from 'components/ThemeSwitcher/ThemeSwitchr.module.scss';
import SunIcon from 'assets/icons/sun-icon.svg';
import MoonIcon from 'assets/icons/moon-icon.svg';
import { useTheme } from 'hooks/useTheme';

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  return (
    <button
      className={classes.container}
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      {theme === 'dark' && <img src={SunIcon} />}
      <div className={`${classes.switch} ${classes[theme]}`} />
      {theme === 'light' && <img src={MoonIcon} />}
    </button>
  );
};
