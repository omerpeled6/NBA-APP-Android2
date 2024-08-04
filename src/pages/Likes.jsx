/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { fetchLikedPlayers } from '../data/api';
import PlayerCard from '../components/PlayerCard';
import styles from '../styles/PlayerList.module.css';

const Likes = ({ user }) => {
  const [likedPlayers, setLikedPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const playersData = await fetchLikedPlayers(user);
        setLikedPlayers(playersData);
      } catch (error) {
        console.error('Error fetching liked players:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, [user]);

  const handleRemovePlayer = (playerId) => {
    setLikedPlayers(likedPlayers.filter((player) => player.id !== playerId));
  };

  return (
    <div className={styles.playerListContainer}>
      <h2>Liked Players</h2>
      {loading ? (
        <p>Loading liked players...</p>
      ) : (
        <div className={styles.playerList}>
          {likedPlayers.length > 0 ? (
            likedPlayers.map((player) => (
              <PlayerCard
                key={player.id}
                player={player}
                user={user}
                onRemove={handleRemovePlayer}
              />
            ))
          ) : (
            <p>No liked players found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Likes;
