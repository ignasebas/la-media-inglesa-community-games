import Button from "./Button"
import MatchCard from "./MatchCard"

const Home: React.FC = () => {
    return (
        <div style={{padding: '1rem', flexDirection: 'column', display: 'flex', justifyContent: 'center'}}>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <h1>Welcome</h1>
                <p>This is the home page for the Media Inglesa Community Game page</p>
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between', gap: '1rem'}}>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '320px'}}>
                    <div>
                        <h2>Predictions</h2>
                        <p>Make your predictions for the upcoming games</p>
                    </div>
                    <div>
                        <MatchCard id="1" home={{team: "Wolverhampton Wanderers", bgColor: "orange", txtColor: "white"}} away={{team: "Brighton & Hove Albion", bgColor: "blue", txtColor: "white"}} odds={{home: 50, draw: 30, away: 20}} handlePredictionChange={() => console.log("Prueba")}/>
                        <MatchCard id="2" home={{team: "Manchester City", bgColor: "skyblue", txtColor: "black"}} away={{team: "Liverpool", bgColor: "red", txtColor: "white"}} odds={{home: 40, draw: 30, away: 30}} handlePredictionChange={() => console.log("Prueba")}/>
                        <MatchCard id="3" home={{team: "Arsenal", bgColor: "red", txtColor: "white"}} away={{team: "Tottenham", bgColor: "white", txtColor: "black"}} odds={{home: 40, draw: 30, away: 30}} handlePredictionChange={() => console.log("Prueba")}/>
                    </div>
                    <Button text="Make Your Predictions" link="/predictions" />
                </div>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '320px'}}>
                    <h2>Team Of The Week</h2>
                    <p>Choose your team of the week</p>

                    <Button text="Add to your team" link="/team-of-the-week" />
                </div>
            </div>
        </div>
        
    )
}
  
export default Home