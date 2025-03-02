import { useState } from "react";
import "./MatchCard.css";

interface MatchCardProps {
    team1: {
        team: string;
        bgColor: string;
        txtColor: string;
    };
    team2: {
        team: string;
        bgColor: string;
        txtColor: string;
    };
    odds: {
        home: number;
        draw: number;
        away: number;
    };
}

const MatchCard: React.FC<MatchCardProps> = ({ team1, team2, odds }) => {
    const [totalOdds, setTotalOdds] = useState(odds.home + odds.draw + odds.away);
    const [homePercentage, setHomePercentage] = useState(`${(odds.home / totalOdds * 100).toFixed(2)}%`);
    const [drawPercentage, setDrawPercentage] = useState(`${(odds.draw / totalOdds * 100).toFixed(2)}%`);
    const [awayPercentage, setAwayPercentage] = useState(`${(odds.away / totalOdds * 100).toFixed(2)}%`);
    const [outcomeSubmission, setOutcomeSubmission] = useState<"home" | "draw" | "away" | null>(null);
    
    const handleOutcomeSubmission = (outcome: "home" | "draw" | "away") => {
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
        
        setHomePercentage(`${((odds.home / newTotalOdds) * 100).toFixed(2)}%`);
        setDrawPercentage(`${((odds.draw / newTotalOdds) * 100).toFixed(2)}%`);
        setAwayPercentage(`${((odds.away / newTotalOdds) * 100).toFixed(2)}%`);
    };

    return (
        <>
            <div className="match-card">
                <div className="team-container">
                    <span className="team-icon" style={{ backgroundColor: team1.bgColor, color: team1.txtColor }}>
                        {team1.team.charAt(0)}
                    </span>
                    <span>{team1.team}</span>
                </div>
                <span>vs</span>
                <div className="team-container">
                    <span>{team2.team}</span>
                    <span className="team-icon" style={{ backgroundColor: team2.bgColor, color: team2.txtColor }}>
                        {team2.team.charAt(0)}
                    </span>
                </div>
            </div>

            <div className="match-odds-container">
                <div className={`match-odds-box ${outcomeSubmission === "home" ? "selected" : ""}`} onClick={() => handleOutcomeSubmission("home")}>
                    1
                </div>
                <div className={`match-odds-box ${outcomeSubmission === "draw" ? "selected" : ""}`} onClick={() => handleOutcomeSubmission("draw")}>
                    x
                </div>
                <div className={`match-odds-box ${outcomeSubmission === "away" ? "selected" : ""}`} onClick={() => handleOutcomeSubmission("away")}>
                    2
                </div>
            </div>

            {outcomeSubmission && (
                <div className="outcome-container">
                    <div className="outcome-box" style={{ width: homePercentage, backgroundColor: team1.bgColor, color: team1.txtColor }}>
                        {homePercentage}
                    </div>
                    <div className="outcome-box" style={{ width: drawPercentage, backgroundColor: "#e0e0e0" }}>
                        {drawPercentage}
                    </div>
                    <div className="outcome-box" style={{ width: awayPercentage, backgroundColor: team2.bgColor, color: team2.txtColor }}>
                        {awayPercentage}
                    </div>
                </div>
            )}
        </>
    );
};

export default MatchCard;
