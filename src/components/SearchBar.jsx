import React, { useState, useEffect } from 'react';
import styles from '../styles/SearchBar.module.css';
import teamsData from '../data/TeamData.json'; // Import the JSON file

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [selectedTeam, setSelectedTeam] = useState('');
  const [price, setPrice] = useState('');
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    // Load teams from JSON file
    setTeams(teamsData.teams);
  }, []);

  const handleSearch = () => {
    onSearch(query, selectedTeam, price);
  };

  const handleReset = () => {
    setQuery('');
    setSelectedTeam('');
    setPrice('');
    onSearch('', '', ''); // Reset the search and team filters
  };

  const handleTeamChange = (e) => {
    const teamId = e.target.value;
    setSelectedTeam(teamId);
  };

  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        placeholder="Search player by name"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <select
        className={styles.select}
        value={selectedTeam}
        onChange={handleTeamChange}
      >
        <option value="">Select a team</option>
        {teams.map((team) => (
          <option key={team.id} value={team.id}>
            {team.name}
          </option>
        ))}
      </select>
      <input
        className={styles.price}
        placeholder="Search player by price (1-5)"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        type="number"
        min="1"
        max="5"
      />
      <button className={styles.button} onClick={handleSearch}>
        <span className={styles.buttonText}>Search</span>
      </button>
      <button className={styles.button} onClick={handleReset}>
        <span className={styles.buttonText}>Reset</span>
      </button>
    </div>
  );
};

export default SearchBar;
