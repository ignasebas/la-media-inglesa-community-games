import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Layout from './compoments/Layout'
import Predictions from './features/predictions/Predictions'
import TeamOfTheWeek from './features/team_of_the_week/TeamOfTheWeek'
import Home from './compoments/Home'
import { AuthProvider } from './context/AuthContext'

function App() {
	return (
		<AuthProvider>
			<BrowserRouter>
				<Layout>
					<Routes>
						<Route path="/" element={<Home/>}/>
						<Route path="/predictions" element={<Predictions/>}/>
						<Route path="/team-of-the-week" element={<TeamOfTheWeek/>}/>
					</Routes>
				</Layout>
			</BrowserRouter>
		</AuthProvider>
	)
}

export default App
