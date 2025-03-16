import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MatchdayListResponse } from '../../types/results';
import './Results.css';

export const Results = () => {
  const [matchdays, setMatchdays] = useState<MatchdayListResponse['matchdays']>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMatchdays = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/matchdays');
        if (!response.ok) {
          throw new Error('Error fetching matchdays');
        }
        const data: MatchdayListResponse = await response.json();
        setMatchdays(data.matchdays.sort((a, b) => b.id - a.id));
        setError(null);
      } catch (err: any) {
        console.error(err);
        setError(err.message || 'Unknown Error');
      } finally {
        setLoading(false);
      }
    };

    fetchMatchdays();
  }, []);

  if (loading) return <p>Loading matchdays...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ padding: "1rem" }}>
      <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column', marginBottom: '2rem'}}>
        <h1>RESULTS</h1>
        <p>Check out the results from all Premier League matchdays</p>
      </div>
      <div className="results-grid">
        {matchdays.map((matchday) => (
          <button
            key={matchday.id}
            className="results-button"
            onClick={() => navigate(`/results/${matchday.id}`)}
          >
            {matchday.name}
          </button>
        ))}
      </div>
    </div>
  );
}; 