import { FC } from 'react';
import classes from 'components/ImageWithParallax/ImageWithParallax.module.scss';

interface ImageWithParallaxProps {
  src: string;
}

export const ImageWithParallax: FC<ImageWithParallaxProps> = ({ src }) => {
  return (
    <div className={classes.container}>
      <img src={src} />
    </div>
  );
};
