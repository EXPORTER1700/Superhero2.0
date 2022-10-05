import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { IHero } from 'models/hero';
import { Loader } from 'components/Loader/Loader';
import { HeroService } from 'services/HeroService';
import classes from 'pages/Hero/HeroPage.module.scss';
import { ImageWithParallax } from 'components/ImageWithParallax/ImageWithParallax';

const HeroPage = () => {
  const params = useParams();
  const { id } = params;
  const [hero, setHero] = useState<IHero | null>(null);

  useEffect(() => {
    if (id) {
      (async function () {
        const hero = await HeroService.getOneById(+id);

        setHero(hero);
      })();
    }
  }, [id]);

  if (!hero) {
    return <Loader />;
  }

  return (
    <div className={classes.container}>
      <ImageWithParallax src={hero.image.url} />
      <div className={classes.content}>
        <div className={classes.row}>
          <span className={classes.name}>NAME:</span>
          <span className={classes.value}>{hero.name}</span>
        </div>
        <div className={classes.row}>
          <span className={classes.name}>GENDER:</span>
          <span className={classes.value}>{hero.appearance.gender}</span>
        </div>
        <div className={classes.row}>
          <span className={classes.name}>RACE:</span>
          <span className={classes.value}>{hero.appearance.race}</span>
        </div>
        <div className={classes.row}>
          <span className={classes.name}>HEIGHT:</span>
          <span className={classes.value}>{hero.appearance.height[1]}</span>
        </div>
        <div className={classes.row}>
          <span className={classes.name}>WEIGHT:</span>
          <span className={classes.value}>{hero.appearance.weight[1]}</span>
        </div>
        <div className={classes.row}>
          <span className={classes.name}>EYE COLOR:</span>
          <span className={classes.value}>{hero.appearance['eye-color']}</span>
        </div>
        <div className={classes.row}>
          <span className={classes.name}>HAIR COLOR:</span>
          <span className={classes.value}>{hero.appearance['hair-color']}</span>
        </div>
        <div className={classes.row}>
          <span className={classes.name}>OCCUPATION:</span>
          <span className={classes.value}>{hero.work.occupation}</span>
        </div>
        <div className={classes.row}>
          <span className={classes.name}>PUBLISHER:</span>
          <span className={classes.value}>{hero.biography.publisher}</span>
        </div>
      </div>
    </div>
  );
};

export default HeroPage;
