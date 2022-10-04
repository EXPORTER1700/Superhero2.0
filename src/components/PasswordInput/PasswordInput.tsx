import { InputHTMLAttributes, useState } from 'react';
import { Input } from 'components/Input/Input';
import EyeIcon from 'assets/icons/eye-solid.svg';
import classes from 'components/PasswordInput/PasswordInput.module.scss';

export const PasswordInput = (props: InputHTMLAttributes<HTMLInputElement>) => {
  const [type, setType] = useState('password');

  const onEyeMouseDown = () => {
    setType('text');

    window.addEventListener('mouseup', () => setType('password'));
  };

  return (
    <div className={classes.container}>
      <Input type={type} {...props} />
      <img onMouseDown={onEyeMouseDown} src={EyeIcon} />
    </div>
  );
};
