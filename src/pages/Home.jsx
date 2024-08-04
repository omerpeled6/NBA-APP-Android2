import React, { useEffect, useState } from 'react';
import PlayerList from '../components/PlayerList'; // Import PlayerList component
import styles from '../styles/Home.module.css';
import JsonData from '../data/FullData.json';
import teamsData from '../data/TeamData.json'; // Import the teams JSON file

const Home = ({ user }) => {
  const [allPlayers, setAllPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPlayers = () => {
      try {
        const playersData = [];
        for (const conference of Object.values(JsonData)) {
          for (const division of Object.values(conference)) {
            for (const [teamName, teamPlayers] of Object.entries(division)) {
              const team = teamsData.teams.find((t) => t.name === teamName);
              if (team) {
                teamPlayers.forEach((player) => {
                  player.teamId = team.id;
                  player.team = teamName;
                  playersData.push(player);
                });
              }
            }
          }
        }
        setAllPlayers(playersData);
      } catch (error) {
        console.error('Error loading players:', error);
      } finally {
        setLoading(false);
      }
    };
    getPlayers();
  }, []);

  return (
    <div className={styles.appContainer}>
      {loading ? (
        <p>Loading players...</p>
      ) : (
        <PlayerList allPlayers={allPlayers} user={user} />
      )}
    </div>
  );
};

export default Home;
