import { Player } from "../../../types/Player";
import PlayerIcon from "./PlayerIcon";
import "./FullScreenView.css";

interface FullScreenViewProps {
    players: Player[];
    onClose: () => void;
}

function FullScreenView({ players, onClose }: FullScreenViewProps) {
    return (
        <div className="full-screen-team-view">
            <div className="full-screen-header">
                <img 
                    src="https://i0.wp.com/lamediainglesa.com/wp-content/uploads/2021/06/logo.png?fit=246%2C119&ssl=1" 
                    alt="La Media Inglesa Logo"
                    className="full-screen-logo"
                />
                <button className="close-button" onClick={onClose}>×</button>
            </div>
            <div className="full-screen-players-container">
                <div className="players-wrapper">
                    {players.map((player, index) => (
                        <div 
                            key={index} 
                            className="player-position"
                            style={{
                                position: 'absolute',
                                left: `${player.x}%`,
                                top: `${player.y}%`,
                                transform: 'translate(-50%, -50%)'
                            }}
                        >
                            <PlayerIcon 
                                positionIndex={String(index + 1)}
                                player={player}
                                handleModalSelection={() => {}}
                                isGoalkeeper={index === 0}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default FullScreenView; 