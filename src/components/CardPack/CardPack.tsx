import { FC } from 'react';
import { IHero } from 'models/hero';
import CardImage from 'assets/card.png';
import classes from 'components/CardPack/CardPack.module.scss';

interface CardPackProps {
  heroPack: IHero[];
  reverse?: boolean;
}

export const CardPack: FC<CardPackProps> = ({ heroPack, reverse = false }) => {
  return (
    <ul
      className={classes.container}
      style={{ transform: `translate(${reverse ? '-' : ''}50%, 0)` }}
    >
      {heroPack.map((item, index) => (
        <img
          key={item.id + index}
          className={classes.item}
          style={{
            [reverse ? 'left' : 'right']: `${index * 15}px`,
          }}
          src={CardImage}
        />
      ))}
    </ul>
  );
};
