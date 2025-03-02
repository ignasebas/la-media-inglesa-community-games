import { JSX, useState } from "react";

interface Player {
    index?: number;
    id: string;
    name: string;
    position?: string;
    image?: string;
}

const PlayerModal = ({ onClose, addPlayer, playersList}: { onClose: () => void, addPlayer: (player: Player) => void, playersList: Player[]}): JSX.Element => {
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
            <div style={{width:"45px", height: "45px"}}></div>
            <h2>Select Player</h2>
            <button style={{width:"45px", height: "45px"}} onClick={handleClose}>X</button>
        </div>
        <div className="modal-body">
            <div style={{marginBottom:"1rem"}}>
                <input placeholder="Search..." value={searchTerm} onChange={(e) => handlePlayerSearch(e.target.value)}/>
            </div>
            <div className="grid-container-players">
                {filteredList.map((player, index) => (
                    <div key={index} className={`player-selector ${choosenPlayer === player ? "selected" : ""}`} style={{cursor:"pointer"}} onClick={() => setChoosenPlayer(player)}>
                        {player.name}
                    </div>
                ))}
            </div>
        </div>
        <div>
            <a className={`secondary-button ${choosenPlayer ? "" : "disabled"}`} onClick={() => choosenPlayer && handleAddPlayer(choosenPlayer)}>Add Player</a>
        </div>
      </div>
    );
}

export default PlayerModal;