import { InputHTMLAttributes } from 'react';
import classes from 'components/Input/Input.module.scss';
import { combineClasses } from 'utils/combineClasses';

export const Input = (props: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      {...props}
      className={combineClasses(props.className, classes.input)}
    />
  );
};
