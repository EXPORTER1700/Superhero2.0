import { FC, useState } from 'react';
import { IHero } from 'models/hero';
import {
  CombatIcon,
  DurabilityIcon,
  IntelligenceIcon,
  PowerIcon,
  SpeedIcon,
  StrengthIcon,
} from 'assets/icons/powerUps';
import classes from 'components/HeroCard/HeroCard.module.scss';
import { Button } from 'components/Button/Button';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { setUser } from 'store/user';
import { MAX_HERO_PACK_LENGTH } from 'constants/index';

interface CardProps {
  hero: IHero;
  allowSelect?: boolean;
}

export const HeroCard: FC<CardProps> = ({ hero, allowSelect = true }) => {
  const { user } = useAppSelector((state) => state.userReducer);
  const dispatch = useAppDispatch();
  const [isFocused, setIsFocused] = useState(false);
  const [isHeroSelected, setIsHeroSelected] = useState(false);

  const onMouseEnterHandler = () => {
    setIsFocused(true);

    const isHeroSelected = !!user?.heroPack.find((item) => item.id === hero.id);
    setIsHeroSelected(isHeroSelected);
  };

  const handleSelectHero = () => {
    if (user) {
      dispatch(setUser({ ...user, heroPack: [...user.heroPack, hero] }));
      setIsHeroSelected(true);
    }
  };

  const handleUnselectHero = () => {
    if (user) {
      dispatch(
        setUser({
          ...user,
          heroPack: user.heroPack.filter((item) => item.id !== hero.id),
        }),
      );
      setIsHeroSelected(false);
    }
  };

  return (
    <div
      className={classes.container}
      onMouseEnter={onMouseEnterHandler}
      onMouseLeave={() => setIsFocused(false)}
    >
      <ul className={classes.powerUpsList}>
        <li className={classes.item}>
          <PowerIcon />
          <span>{hero.powerstats.power}</span>
        </li>
        <li className={classes.item}>
          <SpeedIcon />
          <span>{hero.powerstats.speed}</span>
        </li>
        <li className={classes.item}>
          <IntelligenceIcon />
          <span>{hero.powerstats.intelligence}</span>
        </li>
        <li className={classes.item}>
          <StrengthIcon />
          <span>{hero.powerstats.strength}</span>
        </li>
        <li className={classes.item}>
          <CombatIcon />
          <span>{hero.powerstats.combat}</span>
        </li>
        <li className={classes.item}>
          <DurabilityIcon />
          <span>{hero.powerstats.durability}</span>
        </li>
      </ul>
      <p className={classes.name}>{hero.name}</p>
      <img src={hero.image.url} className={classes.heroImage} />
      {isFocused && isHeroSelected && allowSelect && (
        <Button className={classes.button} onClick={handleUnselectHero}>
          UNSELECT
        </Button>
      )}
      {isFocused &&
        !isHeroSelected &&
        user &&
        user.heroPack.length < MAX_HERO_PACK_LENGTH &&
        allowSelect && (
          <Button className={classes.button} onClick={handleSelectHero}>
            SELECT
          </Button>
        )}
    </div>
  );
};
