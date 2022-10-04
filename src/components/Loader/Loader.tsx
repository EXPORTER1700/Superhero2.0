import classes from 'components/Loader/Loader.module.scss';

export const Loader = () => {
  return (
    <div className={classes.ldsRing}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};
