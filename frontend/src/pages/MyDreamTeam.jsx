/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { fetchMyDreamTeams } from '../data/api';
import styles from '../styles/DreamTeam.module.css';

const MyDreamTeam = ({ user }) => {
  const [dreamTeams, setDreamTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bestStats, setBestStats] = useState({});
  const [worstStats, setWorstStats] = useState({});

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const { updatedDreamTeams, bestStats, worstStats } =
          await fetchMyDreamTeams(user);
        setDreamTeams(updatedDreamTeams);
        setBestStats(bestStats);
        setWorstStats(worstStats);
      } catch (error) {
        console.error('Error fetching dream teams:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, [user]);

  return (
    <div className={styles.dreamTeamContainer}>
      <h2>My Dream Teams</h2>
      {loading ? (
        <p>Loading dream teams...</p>
      ) : (
        <div className={styles.dreamTeamList}>
          {dreamTeams.length > 0 ? (
            dreamTeams.map((team) => (
              <div key={team._id} className={styles.dreamTeamCard}>
                <div className={styles.playerRow}>
                  {team.players.map((player) => (
                    <div key={player.id} className={styles.playerCard}>
                      <div className={styles.priceTag}>${player.price}</div>
                      <div className={styles.imageContainer}>
                        <img
                          src={player.image}
                          alt={player.name}
                          className={styles.playerImage}
                        />
                        <img
                          src={player.imageTeam}
                          alt={player.team}
                          className={styles.teamImage}
                        />
                      </div>
                      <div className={styles.playerDetails}>
                        <p>
                          <b>{player.name}</b>
                        </p>
                        <p>Number: {player.number}</p>
                        <p>Position: {player.position}</p>
                        <p>Country: {player.country}</p>
                        <p>Age: {player.age}</p>
                        <p>Height: {player.height_m} m</p>
                      </div>
                    </div>
                  ))}
                  <div className={styles.avgCard}>
                    <div className={styles.avgDetails}>
                      <h1>Average</h1>
                      <p
                        className={
                          team.avgPPG === bestStats.bestPPG
                            ? styles.bestStat
                            : team.avgPPG === worstStats.worstPPG
                            ? styles.worstStat
                            : ''
                        }
                      >
                        PPG: {team.avgPPG}
                      </p>
                      <p
                        className={
                          team.avgRPG === bestStats.bestRPG
                            ? styles.bestStat
                            : team.avgRPG === worstStats.worstRPG
                            ? styles.worstStat
                            : ''
                        }
                      >
                        RPG: {team.avgRPG}
                      </p>
                      <p
                        className={
                          team.avgAPG === bestStats.bestAPG
                            ? styles.bestStat
                            : team.avgAPG === worstStats.worstAPG
                            ? styles.worstStat
                            : ''
                        }
                      >
                        APG: {team.avgAPG}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No dream teams found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default MyDreamTeam;
