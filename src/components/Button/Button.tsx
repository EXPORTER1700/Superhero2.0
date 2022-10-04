import { ButtonHTMLAttributes } from 'react';
import { combineClasses } from 'utils/combineClasses';
import classes from 'components/Button/Button.module.scss';

export const Button = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      {...props}
      className={combineClasses(props.className, classes.button)}
    />
  );
};
