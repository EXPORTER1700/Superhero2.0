import { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Input } from 'components/Input/Input';
import { Button } from 'components/Button/Button';
import { PasswordInput } from 'components/PasswordInput/PasswordInput';
import {
  RegistrationErrors,
  validateRegistration,
} from 'utils/validateRegistration';
import classes from 'styles/form.module.scss';
import { prepareUser } from 'utils/prepareUser';

export interface IRegistrationData {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

export const Registration = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<RegistrationErrors | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setErrors(null);
  }, [email, username, password]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const registrationData = { email, username, password, confirmPassword };
    const { isValid, errors } = validateRegistration(registrationData);

    if (isValid) {
      const user = prepareUser(registrationData);
      localStorage.setItem('user', JSON.stringify(user));

      navigate('/login');
    } else {
      setErrors(errors);
    }
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <div className={classes.field}>
        <label htmlFor="email">EMAIL</label>
        <Input
          id="email"
          value={email}
          className={errors?.email ? classes.errorInput : ''}
          onChange={(event) => setEmail(event.target.value)}
        />
        {errors?.email && (
          <p>
            {errors.email.map((item) => (
              <p className={classes.errorMessage}>{item}</p>
            ))}
          </p>
        )}
      </div>
      <div className={classes.field}>
        <label htmlFor="username">USERNAME</label>
        <Input
          id="username"
          value={username}
          className={errors?.username ? classes.errorInput : ''}
          onChange={(event) => setUsername(event.target.value)}
        />
        {errors?.username && (
          <p>
            {errors.username.map((item) => (
              <p className={classes.errorMessage}>{item}</p>
            ))}
          </p>
        )}
      </div>
      <div className={classes.field}>
        <label htmlFor="password">PASSWORD</label>
        <PasswordInput
          id="password"
          value={password}
          className={errors?.password ? classes.errorInput : ''}
          onChange={(event) => setPassword(event.target.value)}
        />
        {errors?.password && (
          <p>
            {errors.password.map((item) => (
              <p className={classes.errorMessage}>{item}</p>
            ))}
          </p>
        )}
      </div>
      <div className={classes.field}>
        <label htmlFor="password">CONFIRM PASSWORD</label>
        <PasswordInput
          id="confirmPassword"
          value={confirmPassword}
          className={errors?.confirmPassword ? classes.errorInput : ''}
          onChange={(event) => setConfirmPassword(event.target.value)}
        />
        {errors?.confirmPassword && (
          <p>
            {errors.confirmPassword.map((item) => (
              <p className={classes.errorMessage}>{item}</p>
            ))}
          </p>
        )}
      </div>
      <Button>REGISTRATION</Button>
    </form>
  );
};
