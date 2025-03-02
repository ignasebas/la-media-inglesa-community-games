import MatchCard from "./MatchCard"

function Home() {
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
                        <MatchCard team1={{team: "Wolverhampton Wanderers", bgColor: "orange", txtColor: "white"}} team2={{team: "Brighton & Hove Albion", bgColor: "blue", txtColor: "white"}} odds={{home: 50, draw: 30, away: 20}} />
                        <MatchCard team1={{team: "Manchester City", bgColor: "skyblue", txtColor: "black"}} team2={{team: "Liverpool", bgColor: "red", txtColor: "white"}} odds={{home: 40, draw: 30, away: 30}} />
                        <MatchCard team1={{team: "Arsenal", bgColor: "red", txtColor: "white"}} team2={{team: "Tottenham", bgColor: "white", txtColor: "black"}} odds={{home: 40, draw: 30, away: 30}} />
                    </div>
                </div>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '320px'}}>
                    <h2>Team Of The Week</h2>
                    <p>Choose your team of the week</p>
                </div>
            </div>
        </div>
        
    )
}
  
export default Home