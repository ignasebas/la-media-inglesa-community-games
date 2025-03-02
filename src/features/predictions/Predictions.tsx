import { useState } from "react";
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
}

const Predictions: React.FC = () => {
    const [nextFixtures, setNextFixtures] = useState<Fixture[]>([
        {
            id: "1",
            homeTeam: { team: "Nottingham Forest", bgColor: "red", txtColor: "white" },
            awayTeam: { team: "Manchester City", bgColor: "skyblue", txtColor: "black" },
            odds: { home: 15, draw: 20, away: 65 },
            date: "Mar 08, 2025",
        },
        {
            id: "2",
            homeTeam: { team: "Brighton & Hove Albion", bgColor: "blue", txtColor: "white" },
            awayTeam: { team: "Fulham", bgColor: "white", txtColor: "black" },
            odds: { home: 45, draw: 30, away: 25 },
            date: "Mar 08, 2025",
        },
        {
            id: "3",
            homeTeam: { team: "Liverpool", bgColor: "red", txtColor: "white" },
            awayTeam: { team: "Southampton", bgColor: "white", txtColor: "red" },
            odds: { home: 70, draw: 20, away: 10 },
            date: "Mar 08, 2025",
        },
        {
            id: "4",
            homeTeam: { team: "Chelsea", bgColor: "blue", txtColor: "white" },
            awayTeam: { team: "Leicester City", bgColor: "blue", txtColor: "white" },
            odds: { home: 55, draw: 30, away: 15 },
            date: "Mar 09, 2025",
        },
        {
            id: "5",
            homeTeam: { team: "Manchester United", bgColor: "red", txtColor: "white" },
            awayTeam: { team: "Arsenal", bgColor: "red", txtColor: "white" },
            odds: { home: 40, draw: 30, away: 30 },
            date: "Mar 09, 2025",
        },
        {
            id: "6",
            homeTeam: { team: "West Ham", bgColor: "claret", txtColor: "blue" },
            awayTeam: { team: "Newcastle", bgColor: "black", txtColor: "white" },
            odds: { home: 35, draw: 30, away: 35 },
            date: "Mar 10, 2025",
        },
        {
            id: "7",
            homeTeam: { team: "Brentford", bgColor: "red", txtColor: "white" },
            awayTeam: { team: "Aston Villa", bgColor: "claret", txtColor: "blue" },
            odds: { home: 30, draw: 35, away: 35 },
            date: "Mar 08, 2025",
        },
        {
            id: "8",
            homeTeam: { team: "Wolverhampton", bgColor: "gold", txtColor: "black" },
            awayTeam: { team: "Everton", bgColor: "blue", txtColor: "white" },
            odds: { home: 40, draw: 30, away: 30 },
            date: "Mar 08, 2025",
        },
        {
            id: "9",
            homeTeam: { team: "Tottenham", bgColor: "white", txtColor: "navy" },
            awayTeam: { team: "Bournemouth", bgColor: "red", txtColor: "black" },
            odds: { home: 50, draw: 30, away: 20 },
            date: "Mar 09, 2025",
        },
        {
            id: "10",
            homeTeam: { team: "Crystal Palace", bgColor: "blue", txtColor: "red" },
            awayTeam: { team: "Ipswich Town", bgColor: "blue", txtColor: "white" },
            odds: { home: 45, draw: 30, away: 25 },
            date: "Mar 08, 2025",
        }
    ]);

    const [predictions, setPredictions] = useState<Record<string, "home" | "draw" | "away">>({});

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
    
    return (
        <div style={{ padding: "1rem" }}>
            <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column', marginBottom: '1rem'}}>
                <h1>Predictions</h1>
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
                        handlePredictionChange={handlePredictionChange}
                    />
                ))}
            </div>
            <div style={{display: 'flex', gap: '1rem', justifyContent: 'center'}}>
                <Button text="Submit Predictions" clickFunction={clickFunction} />
                <Button text="See Predictions Ranking" link="/predictions-ranking"/>
            </div>
        </div>
    );
};

export default Predictions;
