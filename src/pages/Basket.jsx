/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { fetchBasketPlayers, createDreamTeam } from '../data/api';
import { useNavigate } from 'react-router-dom';
import PlayerCard from '../components/PlayerCard';
import styles from '../styles/PlayerList.module.css';
import { PriceAndCountType } from '../PriceAndCountContext';

const Basket = ({ user }) => {
  const [basketPlayers, setBasketPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const { price, setPrice } = useContext(PriceAndCountType);
  const { countPlayer, setCountPlayer } = useContext(PriceAndCountType);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const playersData = await fetchBasketPlayers(user);
        setBasketPlayers(playersData);
      } catch (error) {
        console.error('Error fetching basket players:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, [user]);

  const handleRemovePlayer = (playerId) => {
    setBasketPlayers(basketPlayers.filter((player) => player.id !== playerId));
  };

  setPrice(basketPlayers.reduce((sum, player) => sum + player.price, 0));
  setCountPlayer(basketPlayers.length);

  const isButtonEnabled = price === 15 && countPlayer === 5;

  const handleCreateDreamTeam = async () => {
    try {
      const playerIds = basketPlayers.map((player) => player.id);
      console.log('Creating Dream Team with player IDs:', playerIds); // Add this line for debugging

      await createDreamTeam(user, playerIds, setCountPlayer, setPrice);

      alert('Dream Team created successfully!');
      setBasketPlayers([]); // Clear the basket after creating DreamTeam
      navigate('/mydreamTeam'); // Redirect to Dream Team page
    } catch (error) {
      console.error('Error creating Dream Team:', error);
      alert('Failed to create Dream Team.');
    }
  };

  return (
    <div className={styles.playerListContainer}>
      <h2>Basket Players</h2>
      {loading ? (
        <p>Loading basket players...</p>
      ) : (
        <div className={styles.playerList}>
          {basketPlayers.length > 0 ? (
            basketPlayers.map((player) => (
              <PlayerCard
                key={player.id} // Ensure each player has a unique key
                player={player}
                user={user}
                onRemove={handleRemovePlayer}
              />
            ))
          ) : (
            <p>No players in basket.</p>
          )}
        </div>
      )}
      <p>Total Price: ${price}</p>
      <button
        className={isButtonEnabled ? styles.button : styles.buttonDisable}
        disabled={!isButtonEnabled}
        onClick={handleCreateDreamTeam}
      >
        Create Dream Team
      </button>
    </div>
  );
};

export default Basket;
