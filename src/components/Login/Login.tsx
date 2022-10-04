import { FormEvent, useEffect, useState } from 'react';
import { Input } from 'components/Input/Input';
import { PasswordInput } from 'components/PasswordInput/PasswordInput';
import { Button } from 'components/Button/Button';
import classes from 'styles/form.module.scss';
import { IUser } from 'models/user';
import { useAppDispatch } from 'hooks/redux';
import { setUser } from 'store/user';
import { setStatistic } from 'store/statistic';

export const Login = () => {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const [error, setError] = useState('');

  useEffect(() => {
    setError('');
  }, [emailOrUsername, password]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const userJSON = localStorage.getItem('user');

    if (!userJSON) {
      setError('User is not found');
      return;
    }

    const user: IUser = JSON.parse(userJSON);

    const isValidPassword = user.password === password;

    if (!isValidPassword) {
      setError('User is not found');
      return;
    }

    const isValidEmailOrUsername =
      user.username === emailOrUsername || user.email === emailOrUsername;

    if (!isValidEmailOrUsername) {
      setError('User is not found');
      return;
    }

    const statisticJSON = localStorage.getItem('statistic');

    if (statisticJSON) {
      const statistic = JSON.parse(statisticJSON);

      dispatch(setStatistic(statistic));
    }

    dispatch(setUser(user));
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <div className={classes.field}>
        <label htmlFor="emailOrUsername">EMAIL OR USERNAME</label>
        <Input
          id="emailOrUsername"
          value={emailOrUsername}
          onChange={(event) => setEmailOrUsername(event.target.value)}
        />
      </div>
      <div className={classes.field}>
        <label htmlFor="password">PASSWORD</label>
        <PasswordInput
          id="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      {error && <p className={classes.errorMessage}>{error}</p>}
      <Button>LOGIN</Button>
    </form>
  );
};
