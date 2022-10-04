import { useAppSelector } from 'hooks/redux';
import classes from 'pages/Profile/ProfilePage.module.scss';

export const ProfilePage = () => {
  const { user } = useAppSelector((state) => state.userReducer);
  const { playerStatistic, heroesStatistic } = useAppSelector(
    (state) => state.statisticReducer,
  );

  return (
    <div className={classes.container}>
      <div className={classes.row}>
        <div className={classes.userInfo}>
          <p className={classes.username}>{user?.username}</p>
          <p className={classes.email}>{user?.email}</p>
        </div>
        <div className={classes.userStatistic}>
          <span className={classes}>WIN: {playerStatistic.win}</span>
          <span className={classes}>LOSE: {playerStatistic.lose}</span>
        </div>
      </div>
      <div className={classes.heroesStatisticList}>
        {heroesStatistic.map((item) => (
          <div className={classes.item}>
            <div className={classes.heroInfo}>
              <img className={classes.heroImage} src={item.hero.image.url} />
              <span className={classes}>{item.hero.name}</span>
            </div>
            <div className={classes.scoreContainer}>
              <span className={classes}>WIN: {item.win}</span>
              <span className={classes}>LOSE: {item.lose}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
