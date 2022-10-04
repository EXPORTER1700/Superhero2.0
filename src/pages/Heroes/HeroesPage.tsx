import { useEffect, useState } from 'react';
import { HeroService } from 'services/HeroService';
import { IHero } from 'models/hero';
import { HeroCard } from 'components/HeroCard/HeroCard';
import { Loader } from 'components/Loader/Loader';
import { Pagination } from 'components/Pagination/Pagination';
import { ALL_HERO_COUNT } from 'constants/index';
import classes from 'pages/Heroes/HeroesPage.module.scss';

const itemsOnPage = 20;

export const HeroesPage = () => {
  const [heroes, setHeroes] = useState<IHero[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setHeroes([]);

    (async function () {
      setIsLoading(true);
      const heroes: IHero[] = [];

      const startIndex = 1 + currentPage * itemsOnPage - itemsOnPage;

      for (let i = startIndex; i < startIndex + itemsOnPage; i++) {
        const hero = await HeroService.getOneById(i);
        heroes.push(hero);
      }

      await Promise.all(heroes).then(() => {
        setHeroes(heroes);
      });

      setIsLoading(false);
    })();
  }, [currentPage]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>HEROES</h1>
      <ul className={classes.list}>
        {heroes.map((hero) => (
          <div key={hero.id} className={classes.cardContainer}>
            <HeroCard key={hero.id} hero={hero} />
          </div>
        ))}
      </ul>
      <Pagination
        currentPage={currentPage}
        itemsCount={ALL_HERO_COUNT}
        itemsOnPage={itemsOnPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};
