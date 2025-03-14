import { Link } from "react-router-dom"
import { useState } from "react"
import './Navbar.css'
import { useAuth } from "../context/AuthContext"

function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const [showDropdown, setShowDropdown] = useState(false)
    const { isAuthenticated, logout } = useAuth()

    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }

    const handleProfileClick = () => {
        setShowDropdown(!showDropdown)
    }

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    <img 
                        src="https://i0.wp.com/lamediainglesa.com/wp-content/uploads/2021/06/logo.png?fit=246%2C119&ssl=1" 
                        alt="La Media Inglesa Logo"
                    />
                </Link>
                <div className={`navbar-links ${isOpen ? 'open' : ''}`}>
                    <Link 
                        to="/team-of-the-week" 
                        className="navbar-link"
                        onClick={() => setIsOpen(false)}
                    >
                        Team of the week
                    </Link>
                    <Link 
                        to="/predictions" 
                        className="navbar-link"
                        onClick={() => setIsOpen(false)}
                    >
                        Predictions
                    </Link>
                </div>
                <div className={`navbar-right ${isOpen ? 'open' : ''}`}>
                    <div className="profile-container">
                        <button 
                            className="profile-button"
                            onClick={handleProfileClick}
                        >
                            Profile
                        </button>
                        {showDropdown && (
                            <div className="profile-dropdown">
                                {isAuthenticated ? (
                                    <>
                                        <Link to="/edit-profile" className="dropdown-item">
                                            Edit Profile
                                        </Link>
                                        <button 
                                            className="dropdown-item"
                                            onClick={logout}
                                        >
                                            Logout
                                        </button>
                                    </>
                                ) : (
                                    <Link to="/login" className="dropdown-item">
                                        Login
                                    </Link>
                                )}
                            </div>
                        )}
                    </div>
                </div>
                <button className="hamburger" onClick={toggleMenu}>
                    <div style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0)' }} />
                    <div style={{ opacity: isOpen ? '0' : '1' }} />
                    <div style={{ transform: isOpen ? 'rotate(-45deg)' : 'rotate(0)' }} />
                </button>
            </div>
        </nav>
    )
}

export default Navbar
  