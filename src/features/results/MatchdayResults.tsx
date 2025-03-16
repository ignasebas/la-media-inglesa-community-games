import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Match, MatchdayResponse } from '../../types/results';
import './MatchdayResults.css';

export const MatchdayResults = () => {
  const { id } = useParams<{ id: string }>();
  const [matches, setMatches] = useState<Match[]>([]);
  const [matchdayName, setMatchdayName] = useState('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/matchdays/${id}`);
        if (!response.ok) {
          throw new Error('Error fetching matches');
        }
        const data: MatchdayResponse = await response.json();
        setMatches(data.matchday.matches.slice(0, 10));
        setMatchdayName(data.matchday.name);
        setError(null);
      } catch (err: any) {
        console.error(err);
        setError(err.message || 'Unknown Error');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchMatches();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="matchday-container">
        <img 
          src="https://i0.wp.com/lamediainglesa.com/wp-content/uploads/2021/06/logo.png?fit=246%2C119&ssl=1"
          alt="La Media Inglesa Logo"
          className="matchday-logo"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="matchday-container">
        <img 
          src="https://i0.wp.com/lamediainglesa.com/wp-content/uploads/2021/06/logo.png?fit=246%2C119&ssl=1"
          alt="La Media Inglesa Logo"
          className="matchday-logo"
        />
      </div>
    );
  }

  const leftMatches = matches.slice(0, 5);
  const rightMatches = matches.slice(5, 10);
  const matchdayNumber = matchdayName.split(' ')[1];

  return (
    <div className="matchday-container">
      <div className="matchday-content">
        <div className="matchday-matches-left">
          {leftMatches.map((match) => (
            <div key={match.id} className="matchday-match-card">
              <img src={match.homeTeam.logo} alt={match.homeTeam.name} className="matchday-team-logo" />
              {match.status === 'FINISHED' ? (
                <span className="matchday-score-text">
                  {match.score?.home} - {match.score?.away}
                </span>
              ) : (
                <span className="matchday-date-time">
                  {match.time}
                </span>
              )}
              <img src={match.awayTeam.logo} alt={match.awayTeam.name} className="matchday-team-logo" />
            </div>
          ))}
        </div>
        
        <div className="matchday-center">
          <h1 className="matchday-title">Jornada {matchdayNumber}</h1>
          <img 
            src="https://i0.wp.com/lamediainglesa.com/wp-content/uploads/2021/06/logo.png?fit=246%2C119&ssl=1"
            alt="La Media Inglesa Logo"
            className="matchday-logo"
          />
        </div>

        <div className="matchday-matches-right">
          {rightMatches.map((match) => (
            <div key={match.id} className="matchday-match-card">
              <img src={match.homeTeam.logo} alt={match.homeTeam.name} className="matchday-team-logo" />
              {match.status === 'FINISHED' ? (
                <span className="matchday-score-text">
                  {match.score?.home} - {match.score?.away}
                </span>
              ) : (
                <span className="matchday-date-time">
                  {match.time}
                </span>
              )}
              <img src={match.awayTeam.logo} alt={match.awayTeam.name} className="matchday-team-logo" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}; 