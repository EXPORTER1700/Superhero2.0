import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { prepareEnemy } from 'utils/prepareEnemy';
import { IPlayer } from 'models/player';
import { CardPack } from 'components/CardPack/CardPack';
import classes from 'pages/Battle/BattlePage.module.scss';
import { combineClasses } from 'utils/combineClasses';
import { IHero } from 'models/hero';
import { HeroCard } from 'components/HeroCard/HeroCard';
import {
  CombatIcon,
  DurabilityIcon,
  IntelligenceIcon,
  PowerIcon,
  SpeedIcon,
  StrengthIcon,
} from 'assets/icons/powerUps';
import { IPowerUps } from 'models/user';
import { isEmptyObject } from 'utils/isEmptyObject';
import {
  incrementHeroLose,
  incrementHeroWin,
  incrementPlayerLose,
  incrementPlayerWin,
} from 'store/statistic';

interface IStat {
  id: number;
  icon: any;
  name: keyof Omit<IPowerUps, 'updatedAt'>;
}

const statsList: IStat[] = [
  { id: 1, icon: PowerIcon, name: 'power' },
  { id: 2, icon: SpeedIcon, name: 'speed' },
  { id: 3, icon: IntelligenceIcon, name: 'intelligence' },
  { id: 4, icon: StrengthIcon, name: 'strength' },
  { id: 5, icon: CombatIcon, name: 'combat' },
  { id: 6, icon: DurabilityIcon, name: 'durability' },
];

export const BattlePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.userReducer);
  const [player, setPlayer] = useState<IPlayer>({} as IPlayer);
  const [enemy, setEnemy] = useState<IPlayer>({} as IPlayer);
  const [currentPlayer, setCurrentPlayer] = useState<'player' | 'enemy'>(
    'player',
  );
  const [queue, setQueue] = useState<'player' | 'enemy'>('player');
  const [playerCurrentCard, setPlayerCurrentCard] = useState<IHero | null>(
    null,
  );
  const [enemyCurrentCard, setEnemyCurrentCard] = useState<IHero | null>(null);
  const [currentStat, setCurrentStat] = useState<IStat | null>(null);
  const [message, setMessage] = useState('');
  const dispatch = useAppDispatch();

  const changeQueue = () => {
    if (queue === 'player') {
      setQueue('enemy');
    } else {
      setQueue('player');
    }
  };

  const changeCurrentPlayer = () => {
    if (currentPlayer === 'player') {
      setCurrentPlayer('enemy');
    } else {
      setCurrentPlayer('player');
    }
  };

  const playerMakeStepHandler = () => {
    takeCardFromPlayer();
    changeQueue();
  };

  const takeCardFromEnemy = () => {
    setEnemyCurrentCard(enemy.heroPack[enemy.heroPack.length - 1]);
    setEnemy({
      ...enemy,
      heroPack: enemy.heroPack.filter(
        (_, idx) => idx < enemy.heroPack.length - 1,
      ),
    });
  };

  const takeCardFromPlayer = () => {
    setPlayerCurrentCard(player.heroPack[player.heroPack.length - 1]);
    setPlayer({
      ...player,
      heroPack: player.heroPack.filter(
        (_, idx) => idx < player.heroPack.length - 1,
      ),
    });
  };

  const getWin = () => {
    dispatch(incrementHeroWin(playerCurrentCard!));
    setMessage('YOU WIN');
    setPlayer({
      ...player,
      heroPack: [playerCurrentCard!, enemyCurrentCard!, ...player.heroPack],
    });
    changeCurrentPlayer();
    resetCurrentCards();
  };

  const getLose = () => {
    dispatch(incrementHeroLose(playerCurrentCard!));
    setMessage('YOU LOSE');
    setEnemy({
      ...enemy,
      heroPack: [playerCurrentCard!, enemyCurrentCard!, ...enemy.heroPack],
    });
    changeCurrentPlayer();
    resetCurrentCards();
  };

  const getDraw = () => {
    setMessage('DRAW');
    setPlayer({
      ...player,
      heroPack: [playerCurrentCard!, ...player.heroPack],
    });
    setEnemy({
      ...enemy,
      heroPack: [enemyCurrentCard!, ...enemy.heroPack],
    });
    changeCurrentPlayer();
    resetCurrentCards();
  };

  const resetCurrentCards = () => {
    setPlayerCurrentCard(null);
    setEnemyCurrentCard(null);
  };

  useEffect(() => {
    if (queue === 'enemy' && currentPlayer === 'enemy') {
      setTimeout(() => {
        const index = Math.floor(Math.random() * (statsList.length - 1));
        setCurrentStat(statsList[index]);
        takeCardFromEnemy();
        changeQueue();
      }, 2000);
    }
    if (queue === 'player' && currentPlayer === 'enemy') {
      setTimeout(takeCardFromPlayer, 2000);
    }
    if (queue === 'enemy' && currentPlayer === 'player') {
      setTimeout(takeCardFromEnemy, 1000);
    }
  }, [queue, currentPlayer]);

  useEffect(() => {
    if (message) {
      setTimeout(() => {
        setMessage('');
      }, 1500);
    }
  }, [message]);

  useEffect(() => {
    if (playerCurrentCard && enemyCurrentCard && currentStat) {
      const playerCurrentStat = +playerCurrentCard.powerstats[currentStat.name];
      const enemyCurrentStat = +enemyCurrentCard.powerstats[currentStat.name];

      if (playerCurrentStat > enemyCurrentStat) {
        setTimeout(getWin, 2000);
      } else if (playerCurrentStat < enemyCurrentStat) {
        setTimeout(getLose, 2000);
      } else {
        setTimeout(getDraw, 2000);
      }
    }
  }, [playerCurrentCard, enemyCurrentCard]);

  useEffect(() => {
    if (!isEmptyObject(player) && !player?.heroPack.length) {
      dispatch(incrementPlayerLose());
      setMessage('YOU LOSE');
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }
    if (!isEmptyObject(enemy) && !enemy?.heroPack.length) {
      dispatch(incrementPlayerWin());
      setMessage('YOU WIN');
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }
  }, [player, enemy]);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    let date = Date.now();

    (async function () {
      const player = {
        id: user.id,
        username: user.username,
        heroPack: user.heroPack,
        powerUps: user.powerUps,
      };

      const enemy = await prepareEnemy();
      setPlayer(player);
      setEnemy(enemy);
      let dateEnd = Date.now();
      let gap = dateEnd - date; //Формирование искуственной задержки как указано в задании

      if (gap < 3000) {
        setTimeout(() => {
          setIsLoading(false);
        }, 3000 - gap);
      } else {
        setIsLoading(false);
      }
    })();
  }, []);

  if (isLoading) {
    return (
      <div className={classes.loadingScreen}>
        <Loader />
        <h1>LOOKING FOR AN ENEMY</h1>
        <Button onClick={() => navigate('/')}>CANCEL</Button>
      </div>
    );
  }

  return (
    <div className={classes.gameTable}>
      <div className={combineClasses(classes.player, classes.top)}>
        <div className={classes.nameContainer}>
          <p>{enemy.username}</p>
          {queue === 'enemy' && <div className={classes.dot} />}
        </div>
        <CardPack heroPack={enemy.heroPack} />
      </div>
      <div className={classes.gameCardContainer}>
        {enemyCurrentCard && (
          <HeroCard allowSelect={false} hero={enemyCurrentCard} />
        )}
        {playerCurrentCard && (
          <HeroCard allowSelect={false} hero={playerCurrentCard} />
        )}
      </div>
      <div className={classes.statsContainer}>
        <ul className={classes.statList}>
          {statsList.map((item) => (
            <li
              key={item.id}
              className={combineClasses(
                classes.item,
                item.id === currentStat?.id && classes.active,
              )}
              onClick={() =>
                queue === 'player' && currentPlayer === 'player'
                  ? setCurrentStat(item)
                  : null
              }
            >
              <item.icon />
              <span>{item.name.toUpperCase()}</span>
            </li>
          ))}
        </ul>

        {queue === 'player' && currentPlayer === 'player' && (
          <Button disabled={!currentStat} onClick={playerMakeStepHandler}>
            SELECT STAT
          </Button>
        )}
      </div>
      <div className={combineClasses(classes.player, classes.bottom)}>
        <CardPack heroPack={player.heroPack} reverse={true} />
        <div className={classes.nameContainer}>
          <p>{player.username}</p>
          {queue === 'player' && <div className={classes.dot} />}
        </div>
      </div>
      {message && <p className={classes.message}>{message}</p>}
    </div>
  );
};
