import { useEffect, useState } from "react";
import MatchCard from "../../compoments/MatchCard";
import "./Predictions.css";
import Button from "../../compoments/Button";

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

function Predictions() {
    const [nextFixtures, setNextFixtures] = useState<Fixture[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [predictions, setPredictions] = useState<Record<string, "home" | "draw" | "away">>({});

    useEffect(() => {
        const fetchFixtures = async () => {
            try {
                const response = await fetch("http://127.0.0.1:5000/games");
                if (!response.ok) {
                    throw new Error("Error fetching the fixtures");
                }
                const { value }: { value: Fixture[] } = await response.json();
                setNextFixtures(value);
            } catch (err: any) {
                console.error(err);
                setError(err.message || "Unknown Error");
            } finally {
                setLoading(false);
            }
        };
    
        fetchFixtures();
    }, []);    

    const handlePredictionChange = (fixtureId:string, prediction:"home" | "draw" | "away") => {
        setPredictions(prev =>({
            ...prev,
            [fixtureId]: prediction
        }))
    }
    const clickFunction = () => {
        if (Object.keys(predictions).length !== nextFixtures.length){
            console.log("You must complete all predictions to submit")
            return
        }
        console.log("Predictions submitted: ", predictions);
    }
    
    if (loading) return <p>Loading fixtures...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div style={{ padding: "1rem" }}>
            <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column', marginBottom: '1rem'}}>
                <h1>PREDICTIONS</h1>
                <p>Make your predictions for the upcoming games</p>
            </div>
            <div className="grid-container">
                {nextFixtures.map((fixture, index) => (
                    <MatchCard
                        key={index}
                        id={fixture.id}
                        home={fixture.homeTeam}
                        away={fixture.awayTeam}
                        odds={fixture.odds}
                        date={fixture.date}
                        hour={fixture.hour}
                        handlePredictionChange={handlePredictionChange}
                    />
                ))}
            </div>
            <div style={{display: 'flex', gap: '1rem', justifyContent: 'center'}}>
                <Button text="Submit Predictions" clickFunction={clickFunction} />
            </div>
        </div>
    );
};

export default Predictions;
