import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../styles/PlayerCard.module.css';
import {
  addToLikes,
  removeFromLikes,
  addToBasket,
  removeFromBasket,
} from '../data/api';
import { PriceAndCountType } from '../PriceAndCountContext';

const PlayerCard = ({ player, user, onRemove }) => {
  const location = useLocation();
  const { price, setPrice } = useContext(PriceAndCountType);
  const { countPlayer, setCountPlayer } = useContext(PriceAndCountType);
  return (
    <div className={styles.card}>
      <div className={styles.priceTag}>${player.price}</div>
      {player.imageTeam && (
        <img
          src={player.imageTeam}
          alt={player.team}
          className={styles.teamImage}
        />
      )}
      <div className={styles.imageContainer}>
        {player.image && (
          <img
            src={player.image}
            alt={player.name}
            className={styles.playerImage}
          />
        )}
      </div>
      <div className={styles.textContainer}>
        <p className={styles.name}>{player.name}</p>
        <p className={styles.detail}>Number: {player.number}</p>
        <p className={styles.detail}>Position: {player.position}</p>
        <p className={styles.detail}>Team: {player.team}</p>
        <p className={styles.detail}>Country: {player.country}</p>
        <p className={styles.detail}>Age: {player.age}</p>
        <p className={styles.detail}>Height: {player.height_m}m</p>
        <p className={styles.detail}>PPG: {player.ppg}</p>
        <p className={styles.detail}>RPG: {player.rpg}</p>
        <p className={styles.detail}>APG: {player.apg}</p>
      </div>
      <div className={styles.buttonContainer}>
        {location.pathname === '/' && (
          <>
            <button
              className={styles.addButton}
              onClick={() => addToLikes(user, player)}
            >
              ❤️
            </button>
            <button
              className={styles.addButton}
              onClick={() =>
                addToBasket(user, player, setPrice, setCountPlayer)
              }
            >
              🛒
            </button>
          </>
        )}
        {location.pathname === '/my-players' && (
          <>
            <button
              className={styles.removeButton}
              onClick={() => removeFromLikes(user, player, onRemove)}
            >
              🤍
            </button>
            <button
              className={styles.addButton}
              onClick={() =>
                addToBasket(user, player, setPrice, setCountPlayer)
              }
            >
              🛒
            </button>
          </>
        )}
        {location.pathname === '/my-basket' && (
          <>
            <button
              className={styles.removeButton}
              onClick={() =>
                removeFromBasket(
                  user,
                  player,
                  onRemove,
                  setPrice,
                  setCountPlayer
                )
              }
            >
              🛒
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default PlayerCard;
