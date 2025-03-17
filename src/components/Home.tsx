import { useEffect, useState } from "react";
import Button from "./Button"
import MatchCard from "./MatchCard"

interface Fixture {
    id: string;
    homeTeam: {
        team: string;
        bgColor: string;
        txtColor: string;
    };
    awayTeam: {
        team: string;
        bgColor: string;
        txtColor: string;
    };
    odds: {
        home: number;
        draw: number;
        away: number;
    };
    date: string;
    hour: string;
}

function Home() {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [listOfFixtures, setListOfFixtures] = useState<Fixture[]>([]);

    useEffect(() => {
        const fetchFixtures = async () => {
            try {
                const response = await fetch("http://127.0.0.1:5000/games");
                if (!response.ok) {
                    throw new Error("Error fetching the fixtures");
                }
                const { value }: { value: Fixture[] } = await response.json();
                setListOfFixtures(value);
            } catch (err: any) {
                console.error(err);
                setError(err.message || "Unknown Error");
            } finally {
                setLoading(false);
            }
        };
    
        fetchFixtures();
    }, []); 

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    return (
        <div style={{padding: '1rem', flexDirection: 'column', display: 'flex', justifyContent: 'center'}}>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <h1>WELCOME</h1>
                <p>This is the home page for the Media Inglesa Community Game page</p>
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between', gap: '1rem'}}>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '320px'}}>
                    <div>
                        <h2>PREDICTIONS</h2>
                        <p>Make your predictions for the upcoming games</p>
                    </div>
                    <div>
                        {listOfFixtures.slice(0, 3).map((fixture, index) => (
                            <MatchCard
                                key={index}
                                id={fixture.id}
                                home={fixture.homeTeam}
                                away={fixture.awayTeam}
                                date={fixture.date}
                                hour={fixture.hour}
                                odds={fixture.odds}
                            />
                        ))}
                    </div>
                    <Button text="Make Your Predictions" link="/predictions" />
                </div>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '320px'}}>
                    <h2>TEAM OF THE WEEK</h2>
                    <p>Choose your team of the week</p>

                    <Button text="Add to your team" link="/team-of-the-week" />
                </div>
            </div>
        </div>
        
    )
}
  
export default Home