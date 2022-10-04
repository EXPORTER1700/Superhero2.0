import { Login } from 'components/Login/Login';
import classes from 'pages/Registration/RegistartionPage.module.scss';

export const LoginPage = () => {
  return (
    <div className={classes.content}>
      <h1 className={classes.title}>LOGIN</h1>
      <Login />
    </div>
  );
};
