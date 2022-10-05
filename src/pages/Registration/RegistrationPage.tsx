import { Registration } from 'components/Registration/Registration';
import classes from 'pages/Registration/RegistartionPage.module.scss';

const RegistrationPage = () => {
  return (
    <div className={classes.content}>
      <h1 className={classes.title}>REGISTRATION</h1>
      <Registration />
    </div>
  );
};

export default RegistrationPage;
