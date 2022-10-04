import { FC, useMemo } from 'react';
import classes from 'components/Pagination/Pagination.module.scss';

interface PaginationProps {
  currentPage: number;
  itemsCount: number;
  itemsOnPage: number;
  setCurrentPage: (page: number) => void;
}

export const Pagination: FC<PaginationProps> = ({
  itemsCount,
  itemsOnPage,
  currentPage,
  setCurrentPage,
}) => {
  const pagesCount = useMemo(
    () => Math.ceil(itemsCount / itemsOnPage),
    [itemsCount, itemsOnPage],
  );

  const pagesList = useMemo(() => {
    const list = [];
    for (let i = 1; i <= pagesCount; i++) {
      list.push(i);
    }
    return list;
  }, []);

  return (
    <ul className={classes.container}>
      {pagesList.map((item) => (
        <li
          key={item}
          onClick={() => setCurrentPage(item)}
          className={currentPage === item ? classes.active : ''}
        >
          {item}
        </li>
      ))}
    </ul>
  );
};
