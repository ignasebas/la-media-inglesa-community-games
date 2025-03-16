import { useState } from "react";
import { Player } from "../types/Player";

interface PlayerModalProps {
    onClose: () => void;
    addPlayer: (player: Player) => void;
    playersList: Player[];
}

function PlayerModal ({ onClose, addPlayer, playersList}: PlayerModalProps) {
    const [searchTerm, setSearchTerm] = useState<string>("")
    const [choosenPlayer, setChoosenPlayer] = useState<Player>()
    
    const [filteredList, setFilteredList] = useState<Array<Player>>(playersList)

    const handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      onClose();
    };

    const handlePlayerSearch = (searchValue:string) => {
        console.log(searchValue)
        setSearchTerm(searchValue)
        const filter = playersList.filter((player) => {
            return (player.name.toLowerCase()).includes(searchValue.toLowerCase());
        })
        setFilteredList(filter);
    }

    const handleAddPlayer = (addedPlayer: Player) => {
        addPlayer(addedPlayer);
    }

    console.log("Players List: ", playersList)
    return (
        <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
                <div style={{ width:"45px", height: "45px" }}></div>
                <h2>Select Player</h2>
                <button style={{ width:"45px", height: "45px" }} onClick={handleClose}>X</button>
            </div>
            <div className="modal-body">
                <div className="input-container">
                    <input placeholder="Search..." value={searchTerm} onChange={(e) => handlePlayerSearch(e.target.value)} />
                </div>
                <div className="grid-container-players">
                    {filteredList.map((player, index) => (
                        <div key={index} style={{ display:"flex", flexDirection:"column", alignItems:"center", cursor:"pointer",  backgroundColor: `${choosenPlayer === player ? "yellow" : ""}`}} onClick={() => setChoosenPlayer(player)}>
                            <img src={player.image} alt={player.name} style={{ maxWidth:"100px", maxHeight:"100px" }} />
                            <div className="empty-player-icon">
                                <span>{player.name}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="modal-footer">
                <a className={`secondary-button ${choosenPlayer ? "" : "disabled"}`} onClick={() => choosenPlayer && handleAddPlayer(choosenPlayer)}>Add Player</a>
            </div>
        </div>
    );
}

export default PlayerModal;