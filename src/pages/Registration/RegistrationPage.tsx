import { Registration } from 'components/Registration/Registration';
import classes from 'pages/Registration/RegistartionPage.module.scss';

export const RegistrationPage = () => {
  return (
    <div className={classes.content}>
      <h1 className={classes.title}>REGISTRATION</h1>
      <Registration />
    </div>
  );
};
