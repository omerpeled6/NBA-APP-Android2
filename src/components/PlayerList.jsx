import React, { useState, useEffect } from 'react';
import PlayerCard from './PlayerCard';
import SearchBar from './SearchBar';
import Pagination from './Pagination';
import styles from '../styles/PlayerList.module.css';

const PlayerList = ({ allPlayers, user }) => {
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [playersToShow, setPlayersToShow] = useState([]);
  const playersPerPage = 5;

  useEffect(() => {
    setFilteredPlayers(allPlayers);
    setPlayersToShow(allPlayers.slice(0, playersPerPage));
  }, [allPlayers]);

  const handleSearch = (query, teamId, price) => {
    let searchResults = allPlayers;
    if (query) {
      searchResults = searchResults.filter((player) =>
        player.name.toLowerCase().includes(query.toLowerCase())
      );
    }
    if (teamId) {
      searchResults = searchResults.filter(
        (player) => player.teamId === parseInt(teamId, 10)
      );
    }
    if (price) {
      searchResults = searchResults.filter(
        (player) => player.price === parseFloat(price)
      );
    }
    setFilteredPlayers(searchResults);
    setPlayersToShow(searchResults.slice(0, playersPerPage));
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    const startIndex = (page - 1) * playersPerPage;
    const endIndex = startIndex + playersPerPage;
    setPlayersToShow(filteredPlayers.slice(startIndex, endIndex));
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(filteredPlayers.length / playersPerPage);

  return (
    <div className={styles.playerListContainer}>
      <SearchBar onSearch={handleSearch} />
      <div className={styles.playerList}>
        {playersToShow.map((player, index) => (
          <PlayerCard key={index} player={player} user={user} />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default PlayerList;
