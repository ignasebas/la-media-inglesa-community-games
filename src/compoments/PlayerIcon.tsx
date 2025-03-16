import "./PlayerIcon.css"
import { Player } from "../types/Player";

interface PlayerIconProps {
    positionIndex: string;
    player: Player;
    handleModalSelection: (value:boolean, positionIndex:string)=>void;
    onDragStart?: (e: React.DragEvent<HTMLDivElement>) => void;
    isGoalkeeper?: boolean;
}
  
function PlayerIcon ({ positionIndex, player, handleModalSelection, onDragStart, isGoalkeeper }:PlayerIconProps) {
    return (
        <>
            {player.name ? (
                <div 
                    style={{
                        display: "flex", 
                        flexDirection: "column", 
                        alignItems: "center", 
                        cursor: isGoalkeeper ? "not-allowed" : "move", 
                        position: "relative",
                    }} 
                    onClick={() => handleModalSelection(true, positionIndex)}
                    draggable={!isGoalkeeper}
                    onDragStart={onDragStart}
                >
                    <img src={player.image} alt={player.name} style={{width:"75px", height:"75px", objectFit: "cover", borderRadius: "8px"}}/>
                    <div className="player-icon">
                        <span>{player.name}</span>
                    </div>
                </div>
                
            ):(
                <div 
                    style={{
                        display: "flex", 
                        flexDirection: "column", 
                        alignItems: "center", 
                        cursor: isGoalkeeper ? "not-allowed" : "move", 
                        position: "relative",
                    }} 
                    onClick={() => handleModalSelection(true, positionIndex)}
                    draggable={!isGoalkeeper}
                    onDragStart={onDragStart}
                >
                    <img src="https://static.vecteezy.com/system/resources/thumbnails/024/983/914/small_2x/simple-user-default-icon-free-png.png" alt="Empty player slot" style={{width:"75px", height:"75px", objectFit: "cover", borderRadius: "8px"}}/>
                    <div className="player-icon">
                        <span>Player {positionIndex}</span>
                    </div>
                </div>
            )}
        </>
    );
}

export default PlayerIcon;