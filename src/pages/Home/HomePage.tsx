import { useAppSelector } from 'hooks/redux';
import { Button } from 'components/Button/Button';
import classes from 'pages/Home/HomePage.module.scss';
import { useNavigate } from 'react-router';
import { HeroCard } from 'components/HeroCard/HeroCard';
import { MAX_HERO_PACK_LENGTH } from 'constants/index';

export const HomePage = () => {
  const { user } = useAppSelector((state) => state.userReducer);
  const navigate = useNavigate();

  if (!user?.heroPack.length) {
    return (
      <div className={classes.empty}>
        <p>NOT SELECTED HEROES</p>
        <Button onClick={() => navigate('heroes')}>SELECT</Button>
      </div>
    );
  }

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>Your heroes</h1>
      <ul className={classes.list}>
        {user.heroPack.map((hero) => (
          <div className={classes.cardContainer} key={hero.id}>
            <HeroCard hero={hero} />
          </div>
        ))}
        {user.heroPack.length < MAX_HERO_PACK_LENGTH && (
          <div className={classes.cardContainer}>
            <Button onClick={() => navigate('/heroes')}>ADD</Button>
          </div>
        )}
      </ul>
      {user.heroPack.length === MAX_HERO_PACK_LENGTH && (
        <Button className={classes.button} onClick={() => navigate('/battle')}>
          BATTLE
        </Button>
      )}
    </div>
  );
};
