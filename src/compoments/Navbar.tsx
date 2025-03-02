import { Link } from "react-router-dom"

function Navbar() {
    return (
        <div style={{display: 'flex', justifyContent: 'space-between', backgroundColor: 'lightblue', padding: '1rem'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', gap: '1rem'}}>
                <Link to="/">
                    <div>Logo</div>
                </Link >
                <div style={{display: 'flex', justifyContent: 'space-between', gap: '1rem'}}>
                    <Link to="/team-of-the-week">Team of the week</Link >
                    <Link to="/predictions">Predictions</Link >
                </div>
            </div>
            <div>
                <div>Profile</div>
            </div>
        </div>
        
    )
}
  
export default Navbar
  