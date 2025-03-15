import { useState, useCallback } from "react";
import "./MatchCard.css";

interface MatchCardProps {
    id: string,
    home: {
        team: string;
        bgColor: string;
        txtColor: string;
    };
    away: {
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
    handlePredictionChange?: (id: string, outcome: "home" | "draw" | "away") => void;
}

function MatchCard({ id, home, away, odds, date, hour, handlePredictionChange }: MatchCardProps) {
    const [totalOdds, setTotalOdds] = useState(odds.home + odds.draw + odds.away);
    const [homePercentage, setHomePercentage] = useState(`${((odds.home / totalOdds) * 100).toFixed(1)}%`);
    const [drawPercentage, setDrawPercentage] = useState(`${((odds.draw / totalOdds) * 100).toFixed(1)}%`);
    const [awayPercentage, setAwayPercentage] = useState(`${((odds.away / totalOdds) * 100).toFixed(1)}%`);
    const [outcomeSubmission, setOutcomeSubmission] = useState<"home" | "draw" | "away" | null>(null);
    
    const handleOutcomeSubmission = useCallback((outcome: "home" | "draw" | "away") => {
        if (outcomeSubmission === outcome) {
            return;
        }

        setOutcomeSubmission(outcome);
        let newTotalOdds = totalOdds;

        if (outcomeSubmission === null) {
            newTotalOdds = totalOdds + 1;
            setTotalOdds(newTotalOdds);
        }

        if (outcomeSubmission) {
            odds[outcomeSubmission] -= 1;
        }
        odds[outcome] += 1;
        
        setHomePercentage(`${((odds.home / newTotalOdds) * 100).toFixed(1)}%`);
        setDrawPercentage(`${((odds.draw / newTotalOdds) * 100).toFixed(1)}%`);
        setAwayPercentage(`${((odds.away / newTotalOdds) * 100).toFixed(1)}%`);

        handlePredictionChange?.(id, outcome);
    }, [id, odds, outcomeSubmission, totalOdds, handlePredictionChange]);

    return (
        <div>
            <div className="match-card">
                <div className="match-datetime">
                    <span>{date}</span>
                    <span>{hour}</span>
                </div>
                <div className="match-content">
                    <div className="team-container">
                        <span className="team-icon" style={{ backgroundColor: home.bgColor, color: home.txtColor }}>
                            {home.team.charAt(0)}
                        </span>
                        <span className="team-name">{home.team}</span>
                    </div>
                    <span className="vs-text">vs</span>
                    <div className="team-container">
                        <span className="team-name">{away.team}</span>
                        <span className="team-icon" style={{ backgroundColor: away.bgColor, color: away.txtColor }}>
                            {away.team.charAt(0)}
                        </span>
                    </div>
                </div>
            </div>
            
            

            <div className="match-odds-container">
                <div 
                    className={`match-odds-box ${outcomeSubmission === "home" ? "selected" : ""}`} 
                    onClick={() => handleOutcomeSubmission("home")}
                    role="button"
                    tabIndex={0}
                >
                    1
                </div>
                <div 
                    className={`match-odds-box ${outcomeSubmission === "draw" ? "selected" : ""}`} 
                    onClick={() => handleOutcomeSubmission("draw")}
                    role="button"
                    tabIndex={0}
                >
                    X
                </div>
                <div 
                    className={`match-odds-box ${outcomeSubmission === "away" ? "selected" : ""}`} 
                    onClick={() => handleOutcomeSubmission("away")}
                    role="button"
                    tabIndex={0}
                >
                    2
                </div>
            </div>

            {outcomeSubmission && (
                <div className="outcome-container">
                    <div className="outcome-box" style={{ width: homePercentage, backgroundColor: home.bgColor, color: home.txtColor }}>
                        {homePercentage}
                    </div>
                    <div className="outcome-box" style={{ width: drawPercentage, backgroundColor: "rgb(0 0 0 / 25%)", color: "black" }}>
                        {drawPercentage}
                    </div>
                    <div className="outcome-box" style={{ width: awayPercentage, backgroundColor: away.bgColor, color: away.txtColor }}>
                        {awayPercentage}
                    </div>
                </div>
            )}
        </div>
    );
}

export default MatchCard;
