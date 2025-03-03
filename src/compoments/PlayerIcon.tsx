import "./PlayerIcon.css"
interface Player {
    id: string;
    name?: string;
    position?: string;
    image?: string;
}

interface PlayerIconProps {
    positionIndex: string;
    player: Player;
    handleModalSelection: (value:boolean, positionIndex:string)=>void;
}
  
function PlayerIcon ({ positionIndex, player, handleModalSelection }:PlayerIconProps) {
    return (
        <>
            {player.name ? (
                <div style={{display:"flex", flexDirection:"column", alignItems:"center", cursor:"pointer"}} onClick={() => handleModalSelection(true, positionIndex)}>
                    <img src={player.image} alt={player.name} style={{maxWidth:"100px", maxHeight:"100px"}}/>
                    <div className="player-icon">
                        <span>{player.name}</span>
                    </div>
                </div>
                
            ):(
                <div style={{display:"flex", flexDirection:"column", alignItems:"center", cursor:"pointer"}} onClick={() => handleModalSelection(true, positionIndex)}>
                    <img src="https://static.vecteezy.com/system/resources/thumbnails/024/983/914/small_2x/simple-user-default-icon-free-png.png" alt={player.name} style={{maxWidth:"100px", maxHeight:"100px"}}/>
                    <div className="empty-player-icon">
                        <span>Player {positionIndex}</span>
                    </div>
                </div>
            )}
            
        </>
    );
}

export default PlayerIcon;