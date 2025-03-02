import { Route, BrowserRouter, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './compoments/Navbar'
import Predictions from './features/predictions/Predictions'
import TeamOfTheWeek from './features/team_of_the_week/TeamOfTheWeek'
import Home from './compoments/Home'

function App() {
	return (
		<BrowserRouter>
			<Navbar />
			<Routes>
				<Route path="/" element={<Home/>}/>
				<Route path="/predictions" element={<Predictions/>}/>
				<Route path="team-of-the-week" element={<TeamOfTheWeek/>}/>
			</Routes>
		</BrowserRouter>
	)
}

export default App
