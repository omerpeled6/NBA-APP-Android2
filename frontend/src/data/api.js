import axios from 'axios';
import JsonData from './FullData.json';

/************************************ ADD Likes ************************************/
const addToLikes = async (user, player) => {
  if (!user || !player) {
    console.error('User or player data is missing');
    alert('Failed to add player to likes: user or player data is missing');
    return;
  }

  const playerData = {
    user_id: user.fullName,
    player_id: player.id,
  };

  try {
    await axios.post('/api/like', playerData, {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    alert('Player added to likes successfully!');
  } catch (error) {
    console.error('Error adding player to likes:', error);
    alert('Failed to add player to likes.');
  }
};

/************************************ Remove Likes ************************************/
const removeFromLikes = async (user, player, onRemove) => {
  if (!user || !player) {
    console.error('User or player data is missing');
    alert('Failed to remove player from likes: user or player data is missing');
    return;
  }

  try {
    await axios.delete(`/api/like/${player.id}`, {
      headers: { Authorization: `Bearer ${user.token}` },
      data: { user_id: user.fullName },
    });
    if (typeof onRemove === 'function') {
      onRemove(player.id);
    }
    alert('Player removed from likes successfully!');
  } catch (error) {
    console.error('Error removing player from likes:', error);
    alert('Failed to remove player from likes.');
  }
};

/************************************ Remove Basket ************************************/
const removeFromBasket = async (user, player, onRemove) => {
  if (!user || !player) {
    console.error('User or player data is missing');
    alert(
      'Failed to remove player from basket: user or player data is missing'
    );
    return;
  }

  try {
    await axios.delete(`/api/basket/${player.id}`, {
      headers: { Authorization: `Bearer ${user.token}` },
      data: { user_id: user.fullName },
    });
    if (typeof onRemove === 'function') {
      onRemove(player.id);
    }
    alert('Player removed from basket successfully!');
  } catch (error) {
    console.error('Error removing player from basket:', error);
    alert('Failed to remove player from basket.');
  }
};

/************************************ Add Basket ************************************/
const addToBasket = async (user, player) => {
  if (!user || !player) {
    console.error('User or player data is missing');
    alert('Failed to add player to basket: user or player data is missing');
    return;
  }

  const playerData = {
    user_id: user.fullName,
    player_id: player.id,
  };

  try {
    await axios.post('/api/basket', playerData, {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    alert('Player added to basket successfully!');
  } catch (error) {
    console.error('Error adding player to basket:', error);
    alert('Failed to add player to basket.');
  }
};

/************************************ Fetch Like Players ************************************/
const fetchLikedPlayers = async (user) => {
  if (!user) {
    console.error('User data is missing');
    throw new Error('User data is missing');
  }

  try {
    const response = await axios.get('/api/like', {
      headers: { Authorization: `Bearer ${user.token}` },
      params: { user_id: user.fullName },
    });
    console.log('Response data:', response.data); // Add this line for debugging
    const likedPlayerIds = response.data.likes.map((like) => like.player_id);

    const playersData = [];
    Object.values(JsonData).forEach((conference) => {
      Object.values(conference).forEach((division) => {
        Object.values(division).forEach((team) => {
          team.forEach((player) => {
            if (likedPlayerIds.includes(player.id.toString())) {
              playersData.push(player);
            }
          });
        });
      });
    });

    console.log('Liked players data:', playersData); // Add this line for debugging
    return playersData;
  } catch (error) {
    console.error('Error fetching liked players:', error);
    throw error;
  }
};

/************************************ Fetch All Dream Team  ************************************/
const fetchAllDreamTeams = async (user) => {
  if (!user) {
    console.error('User data is missing');
    throw new Error('User data is missing');
  }

  try {
    const response = await axios.get('/api/dreamteam/all', {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    const dreamTeamsData = response.data;

    const updatedDreamTeams = dreamTeamsData.map((team) => {
      const players = [];
      Object.values(JsonData).forEach((conference) => {
        Object.values(conference).forEach((division) => {
          Object.values(division).forEach((teamData) => {
            teamData.forEach((player) => {
              if (team.player_ids.includes(player.id.toString())) {
                players.push(player);
              }
            });
          });
        });
      });

      const avgPPG = (
        players.reduce((sum, player) => sum + player.ppg, 0) / players.length
      ).toFixed(1);
      const avgRPG = (
        players.reduce((sum, player) => sum + player.rpg, 0) / players.length
      ).toFixed(1);
      const avgAPG = (
        players.reduce((sum, player) => sum + player.apg, 0) / players.length
      ).toFixed(1);

      return { ...team, players, avgPPG, avgRPG, avgAPG };
    });

    const stats = {
      bestPPG: Math.max(
        ...updatedDreamTeams.map((team) => parseFloat(team.avgPPG))
      ),
      worstPPG: Math.min(
        ...updatedDreamTeams.map((team) => parseFloat(team.avgPPG))
      ),
      bestRPG: Math.max(
        ...updatedDreamTeams.map((team) => parseFloat(team.avgRPG))
      ),
      worstRPG: Math.min(
        ...updatedDreamTeams.map((team) => parseFloat(team.avgRPG))
      ),
      bestAPG: Math.max(
        ...updatedDreamTeams.map((team) => parseFloat(team.avgAPG))
      ),
      worstAPG: Math.min(
        ...updatedDreamTeams.map((team) => parseFloat(team.avgAPG))
      ),
    };

    return {
      updatedDreamTeams,
      bestStats: {
        bestPPG: stats.bestPPG.toFixed(1),
        bestRPG: stats.bestRPG.toFixed(1),
        bestAPG: stats.bestAPG.toFixed(1),
      },
      worstStats: {
        worstPPG: stats.worstPPG.toFixed(1),
        worstRPG: stats.worstRPG.toFixed(1),
        worstAPG: stats.worstAPG.toFixed(1),
      },
    };
  } catch (error) {
    console.error('Error fetching dream teams:', error);
    throw error;
  }
};

/************************************ Fetch My Dream Team ************************************/
const fetchMyDreamTeams = async (user) => {
  if (!user) {
    console.error('User data is missing');
    throw new Error('User data is missing');
  }

  try {
    const response = await axios.get('/api/dreamteam/', {
      headers: { Authorization: `Bearer ${user.token}` },
      params: { user_id: user.fullName },
    });
    const dreamTeamsData = response.data.dreamTeams;

    const updatedDreamTeams = dreamTeamsData.map((team) => {
      const players = [];
      Object.values(JsonData).forEach((conference) => {
        Object.values(conference).forEach((division) => {
          Object.values(division).forEach((teamData) => {
            teamData.forEach((player) => {
              if (team.player_ids.includes(player.id.toString())) {
                players.push(player);
              }
            });
          });
        });
      });

      const avgPPG = (
        players.reduce((sum, player) => sum + player.ppg, 0) / players.length
      ).toFixed(1);
      const avgRPG = (
        players.reduce((sum, player) => sum + player.rpg, 0) / players.length
      ).toFixed(1);
      const avgAPG = (
        players.reduce((sum, player) => sum + player.apg, 0) / players.length
      ).toFixed(1);

      return { ...team, players, avgPPG, avgRPG, avgAPG };
    });

    const stats = {
      bestPPG: Math.max(
        ...updatedDreamTeams.map((team) => parseFloat(team.avgPPG))
      ),
      worstPPG: Math.min(
        ...updatedDreamTeams.map((team) => parseFloat(team.avgPPG))
      ),
      bestRPG: Math.max(
        ...updatedDreamTeams.map((team) => parseFloat(team.avgRPG))
      ),
      worstRPG: Math.min(
        ...updatedDreamTeams.map((team) => parseFloat(team.avgRPG))
      ),
      bestAPG: Math.max(
        ...updatedDreamTeams.map((team) => parseFloat(team.avgAPG))
      ),
      worstAPG: Math.min(
        ...updatedDreamTeams.map((team) => parseFloat(team.avgAPG))
      ),
    };

    return {
      updatedDreamTeams,
      bestStats: {
        bestPPG: stats.bestPPG.toFixed(1),
        bestRPG: stats.bestRPG.toFixed(1),
        bestAPG: stats.bestAPG.toFixed(1),
      },
      worstStats: {
        worstPPG: stats.worstPPG.toFixed(1),
        worstRPG: stats.worstRPG.toFixed(1),
        worstAPG: stats.worstAPG.toFixed(1),
      },
    };
  } catch (error) {
    console.error('Error fetching dream teams:', error);
    throw error;
  }
};

/************************************ Fetch Basket Players ************************************/
const fetchBasketPlayers = async (user) => {
  if (!user) {
    console.error('User data is missing');
    throw new Error('User data is missing');
  }

  try {
    const response = await axios.get('/api/basket', {
      headers: { Authorization: `Bearer ${user.token}` },
      params: { user_id: user.fullName },
    });
    const basketPlayerIds = response.data.baskets.map(
      (basket) => basket.player_id
    );

    const playersData = [];
    Object.values(JsonData).forEach((conference) => {
      Object.values(conference).forEach((division) => {
        Object.values(division).forEach((team) => {
          team.forEach((player) => {
            if (basketPlayerIds.includes(player.id.toString())) {
              playersData.push(player);
            }
          });
        });
      });
    });

    return playersData;
  } catch (error) {
    console.error('Error fetching basket players:', error);
    throw error;
  }
};

/************************************ Create DreamTeam ************************************/
const createDreamTeam = async (user, playerIds) => {
  if (!user || !playerIds) {
    console.error('User or player IDs data is missing');
    throw new Error('User or player IDs data is missing');
  }

  try {
    await axios.post(
      '/api/dreamteam/add',
      {
        user_id: user.fullName,
        player_ids: playerIds,
      },
      {
        headers: { Authorization: `Bearer ${user.token}` },
      }
    );

    await axios.post(
      '/api/basket/clear',
      { user_id: user.fullName },
      {
        headers: { Authorization: `Bearer ${user.token}` },
      }
    );

    return 'Dream Team created successfully!';
  } catch (error) {
    console.error('Error creating Dream Team:', error);
    throw error;
  }
};

export {
  addToLikes,
  removeFromLikes,
  removeFromBasket,
  addToBasket,
  fetchLikedPlayers,
  fetchAllDreamTeams,
  fetchMyDreamTeams,
  fetchBasketPlayers,
  createDreamTeam,
};
