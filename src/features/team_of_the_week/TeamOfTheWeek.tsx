import { useEffect, useState } from "react";
import Button from "../../compoments/Button";
import PlayerIcon from "./components/PlayerIcon";
import { createPortal } from "react-dom";
import PlayerModal from "./components/PlayerModal";
import { Player } from "../../types/Player";
import FullScreenView from "./components/FullScreenView";
import "./TeamOfTheWeek.css";

function TeamOfTheWeek() {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null);
    const [draggedPlayer, setDraggedPlayer] = useState<{player: Player, index: number, offsetX: number, offsetY: number} | null>(null);
    const [playersList, setPlayersList] = useState<Array<Player>>([]);
    const [showFullScreen, setShowFullScreen] = useState(false);
    const [playersOfTheWeek, setPlayersOfTheWeek] = useState<Player[]>(
        Array.from({ length: 11 }, (_, index) => ({
            index: (index + 1),
            id: "",
            name: "",
            image: "",
            position: "",
            // Initial positions for the team of the week
            x: index < 1 ? 50 : // Goalkeeper
                index < 5 ? (index - 1) * 20 + 20 : // Defenders
                index < 9 ? (index - 5) * 20 + 20 : // Midfielders
                (index - 9) * 40 + 30, // Forwards
            y: index < 1 ? 85 : // Goalkeeper   
                index < 5 ? 65 : // Defenders
                index < 9 ? 40 : // Midfielders
                15, // Forwards
        }))
    );

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

    const handleModalSelection = (value:boolean, positionIndex: string) => {
        setSelectedPlayer(positionIndex);
        setShowModal(value);
    }

    const handleSubmitTeamOfTheWeek = () => {
        console.log("Team of the week submitted")
        console.log(playersOfTheWeek)
    }
    
    const addPlayer = (playerData: Player) => {    
        if (selectedPlayer !== null) {
            const index = parseInt(selectedPlayer, 10) - 1;
            const currentPlayer = playersOfTheWeek[index];
    
            setPlayersOfTheWeek((prevPlayers) => {
                const updatedPlayers = [...prevPlayers];
                const newPlayer = {
                    ...playerData,
                    x: currentPlayer.x,
                    y: currentPlayer.y
                };
                updatedPlayers[index] = newPlayer;
    
                setPlayersList((prevList) => {
                    let newList = prevList.filter((player) => player.id !== playerData.id);
                    if (currentPlayer && currentPlayer.id && !prevList.some(p => p.id === currentPlayer.id)) {
                        newList = [...newList, currentPlayer];
                    }
                    return newList;
                });
    
                return updatedPlayers;
            });
    
            setShowModal(false);
        }
    };

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, player: Player, index: number) => {
        // Prevent dragging the goalkeeper (index 0)
        if (index === 0) {
            e.preventDefault();
            return;
        }
        
        const rect = e.currentTarget.getBoundingClientRect();
        const offsetX = e.clientX - (rect.left + rect.width / 2);
        const offsetY = e.clientY - (rect.top + rect.height / 2);
        
        setDraggedPlayer({ player, index, offsetX, offsetY });
        const target = e.currentTarget as HTMLDivElement;
        target.classList.add('dragging');
    };

    const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
        const target = e.currentTarget as HTMLDivElement;
        target.classList.remove('dragging');
        setDraggedPlayer(null);
    };

    const handleFieldDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.currentTarget.classList.add('field-drag-over');
    };

    const handleFieldDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.currentTarget.classList.remove('field-drag-over');
    };

    const calculatePosition = (e: React.DragEvent<HTMLDivElement>, containerRef: HTMLDivElement) => {
        if (!draggedPlayer) return { x: 0, y: 0 };
        
        const rect = containerRef.getBoundingClientRect();
        const x = ((e.clientX - draggedPlayer.offsetX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - draggedPlayer.offsetY - rect.top) / rect.height) * 100;
        return { x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) };
    };

    const handleFieldDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.currentTarget.classList.remove('field-drag-over');
        
        if (!draggedPlayer) return;
        
        // Calculate the relative position in percentages
        const { x, y } = calculatePosition(e, e.currentTarget);
        
        setPlayersOfTheWeek((prevPlayers) => {
            const updatedPlayers = [...prevPlayers];
            updatedPlayers[draggedPlayer.index] = {
                ...draggedPlayer.player,
                x,
                y
            };
            return updatedPlayers;
        });
    };

    if (loading) return <p>Loading players...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div style={{ padding: "1rem" }}>
            <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
                <h1>TEAM OF THE WEEK</h1>
                <p style={{textAlign: 'center'}}>Click on a player to select them, or drag them to any position on the field</p>
            </div>
            
            <div className="players-section">
                <div 
                    className="players-container"
                    onDragOver={handleFieldDragOver}
                    onDragLeave={handleFieldDragLeave}
                    onDrop={handleFieldDrop}
                >
                    {playersOfTheWeek.map((player, index) => (
                        <div 
                            key={index} 
                            className="player-position"
                            style={{
                                position: 'absolute',
                                left: `${player.x}%`,
                                top: `${player.y}%`,
                                transform: 'translate(-50%, -50%)'
                            }}
                            onDragEnd={handleDragEnd}
                        >
                            <PlayerIcon 
                                positionIndex={String(index + 1)}
                                player={player}
                                handleModalSelection={handleModalSelection}
                                onDragStart={(e) => handleDragStart(e, player, index)}
                                isGoalkeeper={index === 0}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <div className="submit-button-container">
                <Button text="Submit Team" clickFunction={handleSubmitTeamOfTheWeek}/>
                <Button text="Show Team" clickFunction={() => setShowFullScreen(true)}/>
            </div>
            {showModal && createPortal(
                <PlayerModal onClose={() => setShowModal(false)} addPlayer={addPlayer} playersList={playersList}/>,
                document.body
            )}
            {showFullScreen && createPortal(
                <FullScreenView 
                    players={playersOfTheWeek} 
                    onClose={() => setShowFullScreen(false)}
                />,
                document.body
            )}
        </div>
    );
}

export default TeamOfTheWeek;
