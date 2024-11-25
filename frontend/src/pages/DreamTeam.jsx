import React, { useEffect, useState, useRef } from 'react';
import { fetchAllDreamTeams } from '../data/api';
import styles from '../styles/DreamTeam.module.css';
import * as d3 from 'd3';

const DreamTeam = ({ user }) => {
  const [dreamTeams, setDreamTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bestStats, setBestStats] = useState({});
  const [worstStats, setWorstStats] = useState({});
  const chartRef = useRef(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const { updatedDreamTeams, bestStats, worstStats } =
          await fetchAllDreamTeams(user);
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

  useEffect(() => {
    if (!loading && dreamTeams.length > 0) {
      const svg = d3.select(chartRef.current);
      const width = 1000;
      const height = 500;
      const margin = { top: 50, right: 30, bottom: 100, left: 70 };

      svg.selectAll('*').remove(); // Clear previous renders

      svg
        .attr('width', width)
        .attr('height', height)
        .attr('viewBox', [0, 0, width, height]);

      const subgroups = ['avgPPG', 'avgRPG', 'avgAPG'];
      const teams = dreamTeams.map((team) => team.user_id);

      const x0 = d3
        .scaleBand()
        .domain(teams)
        .range([margin.left, width - margin.right])
        .padding(0.1);

      const x1 = d3
        .scaleBand()
        .domain(subgroups)
        .range([0, x0.bandwidth()])
        .padding(0.05);

      const y = d3
        .scaleLinear()
        .domain([
          0,
          d3.max(dreamTeams, (team) =>
            Math.max(team.avgPPG, team.avgRPG, team.avgAPG)
          ),
        ])
        .nice()
        .range([height - margin.bottom, margin.top]);

      const color = d3
        .scaleOrdinal()
        .domain(subgroups)
        .range(['#1f77b4', '#ff7f0e', '#2ca02c']);

      svg
        .append('g')
        .selectAll('g')
        .data(dreamTeams)
        .join('g')
        .attr('transform', (d) => `translate(${x0(d.user_id)},0)`)
        .selectAll('rect')
        .data((d) => subgroups.map((key) => ({ key, value: d[key] })))
        .join('rect')
        .attr('x', (d) => x1(d.key))
        .attr('y', (d) => y(d.value))
        .attr('width', x1.bandwidth())
        .attr('height', (d) => y(0) - y(d.value))
        .attr('fill', (d) => color(d.key))
        .append('title') // Add tooltips
        .text((d) => `${d.key}: ${d.value}`);

      svg
        .append('g')
        .attr('transform', `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x0).tickSizeOuter(0))
        .selectAll('text')
        .attr('transform', 'rotate(-45)')
        .style('text-anchor', 'end');

      svg
        .append('g')
        .attr('transform', `translate(${margin.left},0)`)
        .call(d3.axisLeft(y));

      // Add x-axis label
      svg
        .append('text')
        .attr('class', 'x label')
        .attr('text-anchor', 'end')
        .attr('x', width / 2 + margin.left)
        .attr('y', height - 10)
        .text('User ID');

      // Add y-axis label
      svg
        .append('text')
        .attr('class', 'y label')
        .attr('text-anchor', 'end')
        .attr('y', 20)
        .attr('dy', '.75em')
        .attr('transform', 'rotate(-90)')
        .attr('x', -height / 2 + margin.top)
        .text('Average Stats');

      // Add chart title
      svg
        .append('text')
        .attr('class', 'chart-title')
        .attr('text-anchor', 'middle')
        .attr('x', width / 2)
        .attr('y', margin.top / 2)
        .text('Average Points, Rebounds, and Assists Per Game of Dream Teams');

      // Add legend
      const legend = svg
        .append('g')
        .attr(
          'transform',
          `translate(${width - margin.right - 60}, ${margin.top})`
        );

      legend
        .selectAll('rect')
        .data(subgroups)
        .enter()
        .append('rect')
        .attr('x', 0)
        .attr('y', (d, i) => i * 20)
        .attr('width', 18)
        .attr('height', 18)
        .attr('fill', (d) => color(d));

      legend
        .selectAll('text')
        .data(subgroups)
        .enter()
        .append('text')
        .attr('x', 24)
        .attr('y', (d, i) => i * 20 + 9)
        .attr('dy', '.35em')
        .text((d) => d);
    }
  }, [loading, dreamTeams]);

  return (
    <div className={styles.dreamTeamContainer}>
      <h2>All Dream Teams</h2>
      {loading ? (
        <p>Loading dream teams...</p>
      ) : (
        <>
          <div className={styles.dreamTeamList}>
            {dreamTeams.length > 0 ? (
              dreamTeams.map((team) => (
                <div key={team._id} className={styles.dreamTeamCard}>
                  <h3 className={styles.titleCard}>
                    {team.user_id}'s Dream Team
                  </h3>
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
          <svg ref={chartRef} />
        </>
      )}
    </div>
  );
};

export default DreamTeam;
