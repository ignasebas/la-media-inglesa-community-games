import { useEffect, useState } from "react";
import Button from "../../compoments/Button";
import PlayerIcon from "../../compoments/PlayerIcon";
import { createPortal } from "react-dom";
import PlayerModal from "../../compoments/PlayerModal";

interface Formation {
    strikers: number;
    midfielders: number;
    defenders: number;
    goalkeepers: number;
}
interface Player {
    index?: number;
    id: string;
    name: string;
    position?: string;
    image?: string;
}

function TeamOfTheWeek() {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null);
    const [numberOfPlayers, setNumberOfPlayers] = useState<Formation>({
        strikers: 2,
        midfielders: 4,
        defenders: 4,
        goalkeepers: 1
    });

    const [playersList, setPlayersList] = useState<Array<Player>>([]);

    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                const response = await fetch("http://127.0.0.1:5000/players");
                if (!response.ok) {
                    throw new Error("Error fetching the players");
                }
                const { value }: { value: Player[] } = await response.json();
                setPlayersList(value);
            }
            catch (err: any) {
                console.error(err);
                setError(err.message || "Unknown Error");
            } finally {
                setLoading(false)
            }
        }

        fetchPlayers();
    }, [])
    const [playersOfTheWeek, setPlayersOfTheWeek] = useState<Player[]>(
        Array.from({ length: 11 }, (_, index) => ({
            index: (index + 1),
            id: "",
            name: "",
            image: "",
            position: "", 
        }))
    );

    const handleNumberOfPlayers = (position: "strikers" | "midfielders" | "defenders" | "goalkeepers", number: number) => {
        if (number < 0) {
          console.log("Number of players must be positive");
          return;
        }
        const currentTotal = numberOfPlayers.strikers +numberOfPlayers.midfielders + numberOfPlayers.defenders + numberOfPlayers.goalkeepers;
        const newTotal = currentTotal - numberOfPlayers[position] + number;
        if (newTotal > 11) {
          console.log("Total number of players must be 10");
          return;
        }
        
        const formation = { ...numberOfPlayers, [position]: number };
        setNumberOfPlayers(formation);
        console.log("Formation: ", formation);
      };
      
    const handleModalSelection = (value:boolean, positionIndex: string) => {
        setSelectedPlayer(positionIndex);
        console.log(positionIndex)
        setShowModal(value);
    }

    const handleSubmitTeamOfTheWeek = () => {
        console.log("Team of the week submitted")
        console.log(playersOfTheWeek)
        console.log(numberOfPlayers)
    }
    
    const addPlayer = (playerData: Player) => {    
        if (selectedPlayer !== null) {
            const index = parseInt(selectedPlayer, 10) - 1;
    
            setPlayersOfTheWeek((prevPlayers) => {
                const updatedPlayers = [...prevPlayers];
                const previousPlayer = updatedPlayers[index];
    
                updatedPlayers[index] = playerData;
    
                setPlayersList((prevList) => {
                    let newList = prevList.filter((player) => player.id !== playerData.id);
                    if (previousPlayer && previousPlayer.id && !prevList.some(p => p.id === previousPlayer.id)) {
                        newList = [...newList, previousPlayer];
                    }
                    return newList;
                });
    
                return updatedPlayers;
            });
    
            setShowModal(false);
        }
    };
    
    if (loading) return <p>Loading players...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div style={{padding: '1rem'}}>
            <h1>TEAM OF THE WEEK</h1>
            <div style={{display: 'flex', justifyContent: 'space-between', gap: '1rem'}}>
                <div style={{display: "flex", flexDirection: "column"}}>
                    <h2>FORMATION</h2>
                    <p>Select how many players will be in each position</p>
                    <div style={{display: 'flex', gap: '1rem', alignItems: 'center', height: '136px', marginBottom: '1rem'}}>
                        <h4>Strikers</h4>
                        <input type="number" placeholder="Number of Strikers" value={numberOfPlayers.strikers} onChange={(e) => handleNumberOfPlayers("strikers", Number(e.target.value))}/>
                    </div>
                    <div style={{display: 'flex', gap: '1rem', alignItems: 'center', height: '136px', marginBottom: '1rem'}}>
                        <h4>Midfielders</h4>
                        <input type="number" placeholder="Number of Midfielders" value={numberOfPlayers.midfielders} onChange={(e) => handleNumberOfPlayers("midfielders", Number(e.target.value))}/>
                    </div>
                    <div style={{display: 'flex', gap: '1rem', alignItems: 'center', height: '136px', marginBottom: '1rem'}}>
                        <h4>Defenders</h4>
                        <input type="number" placeholder="Number of Defenders" value={numberOfPlayers.defenders} onChange={(e) => handleNumberOfPlayers("defenders", Number(e.target.value))}/>
                    </div>
                    <div style={{display: 'flex', gap: '1rem', alignItems: 'center', height: '136px', marginBottom: '1rem'}}>
                        <h4>Goalkeeper</h4>
                        <input type="number" placeholder="Number of Goalkeepers" value={numberOfPlayers.goalkeepers} onChange={() => handleNumberOfPlayers("goalkeepers", 1)}/> 
                    </div>
                </div>
                <div style={{display: "flex", flexDirection: "column", flexGrow: "1"}}>
                    <h2>PLAYERS</h2>
                    <p>Choose your players for each position by clicking on the player icon</p>
                    <div>
                        <div style={{ display: 'flex', width: '100%', justifyContent: 'space-evenly', alignItems: 'center', marginBottom: '1rem' }}>
                        {Array.from({ length: numberOfPlayers.strikers }, (_, index) => (
                            <PlayerIcon key={index} positionIndex={String(index + 1 + 1 + numberOfPlayers.defenders + numberOfPlayers.midfielders)} player={playersOfTheWeek[index + 1 + numberOfPlayers.defenders + numberOfPlayers.midfielders]} handleModalSelection={handleModalSelection}/>
                        ))}
                        </div>

                        <div style={{ display: 'flex', width: '100%', justifyContent: 'space-evenly', alignItems: 'center', marginBottom: '1rem' }}>
                        {Array.from({ length: numberOfPlayers.midfielders }, (_, index) => (
                            <PlayerIcon key={index} positionIndex={String(index + 1 + 1 + numberOfPlayers.defenders)} player={playersOfTheWeek[index + 1 + numberOfPlayers.defenders]} handleModalSelection={handleModalSelection}/>
                        ))}
                        </div>

                        <div style={{ display: 'flex', width: '100%', justifyContent: 'space-evenly', alignItems: 'center', marginBottom: '1rem' }}>
                        {Array.from({ length: numberOfPlayers.defenders }, (_, index) => (
                            <PlayerIcon key={index} positionIndex={String(index + 1 + 1)} player={playersOfTheWeek[index + 1]} handleModalSelection={handleModalSelection}/>
                        ))}
                        </div>
                        
                        <div style={{ display: 'flex', width: '100%', justifyContent: 'space-evenly', alignItems: 'center' }}>
                            <PlayerIcon positionIndex={"1"} player={playersOfTheWeek[0]} handleModalSelection={handleModalSelection}/>
                        </div>
                    </div>
                </div>
            </div>
            <Button text="Submit Team" clickFunction={handleSubmitTeamOfTheWeek}/>
            {showModal && createPortal(
                <PlayerModal onClose={() => setShowModal(false)} addPlayer={addPlayer} playersList={playersList}/>,
                document.body
            )}
        </div>
    )
}

export default TeamOfTheWeek;
