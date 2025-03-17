import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout'
import Predictions from './features/predictions/Predictions'
import TeamOfTheWeek from './features/team_of_the_week/TeamOfTheWeek'
import Home from './components/Home'
import { AuthProvider } from './context/AuthContext'
import { Results } from './features/results/Results'
import { MatchdayResults } from './features/results/MatchdayResults'
import Login from './features/auth/Login'
import Register from './features/auth/Register'
import EditProfile from './features/auth/EditProfile'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
	return (
		<AuthProvider>
			<BrowserRouter>
				<Layout>
					<Routes>
						<Route path="/" element={<Home/>}/>
						<Route path="/predictions" element={<Predictions/>}/>
						<Route path="/team-of-the-week" element={<TeamOfTheWeek/>}/>
						<Route path="/results" element={<Results/>}/>
						<Route path="/results/:id" element={<MatchdayResults/>}/>
						<Route path="/login" element={<Login/>}/>
						<Route path="/register" element={<Register/>}/>
						<Route 
							path="/edit-profile" 
							element={
								<ProtectedRoute>
									<EditProfile />
								</ProtectedRoute>
							} 
						/>
					</Routes>
				</Layout>
			</BrowserRouter>
		</AuthProvider>
	)
}

export default App
