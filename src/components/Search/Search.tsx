import { Input } from 'components/Input/Input';
import { ChangeEvent, useRef, useState } from 'react';
import { HeroService } from 'services/HeroService';
import { useDebounce } from 'hooks/useDebounce';
import classes from 'components/Search/Search.module.scss';
import { useNavigate } from 'react-router';
import { useOutsideClick } from 'hooks/useOutsideClick';
import { IHero } from 'models/hero';
import SearchIcon from 'assets/icons/search.svg';

export const Search = () => {
  const [query, setQuery] = useState('');
  const [heroes, setHeroes] = useState<IHero[]>([]);
  const navigate = useNavigate();
  const debounce = useDebounce();
  const searchRef = useRef<HTMLDivElement>(null);
  useOutsideClick(searchRef, () => {
    setQuery('');
    setHeroes([]);
  });

  const handleItemClick = (hero: any) => {
    setQuery('');
    setHeroes([]);
    navigate(`/hero/${hero.id}`);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setQuery(query);

    if (query) {
      debounce(async () => {
        const heroes = await HeroService.searchByName(query);

        setHeroes(heroes);
      }, 300);
    } else {
      setHeroes([]);
    }
  };

  return (
    <div className={classes.container} ref={searchRef}>
      <div className={classes.inputContainer}>
        <Input
          value={query}
          onChange={handleInputChange}
          placeholder={'Search'}
        />
        <img src={SearchIcon} className={classes.icon} />
      </div>
      {!!heroes.length && (
        <ul className={classes.list}>
          {heroes.map((hero) => (
            <li
              className={classes.item}
              key={hero.id}
              onClick={handleItemClick}
            >
              <img src={hero.image.url} />
              <p>{hero.name}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
