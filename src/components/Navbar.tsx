import { Link, useLocation } from "react-router-dom"
import { useState, useEffect } from "react"
import './Navbar.css'
import { useAuth } from "../context/AuthContext"

function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const [showDropdown, setShowDropdown] = useState(false)
    const { isAuthenticated, logout, username } = useAuth()
    const location = useLocation()

    useEffect(() => {
        setShowDropdown(false)
        setIsOpen(false)
    }, [location])

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
                        TEAM OF THE WEEK
                    </Link>
                    <Link 
                        to="/results" 
                        className="navbar-link"
                        onClick={() => setIsOpen(false)}
                    >
                        RESULTS
                    </Link>
                    <Link 
                        to="/predictions" 
                        className="navbar-link"
                        onClick={() => setIsOpen(false)}
                    >
                        PREDICTION
                    </Link>
                </div>
                <div className={`navbar-right ${isOpen ? 'open' : ''}`}>
                    <div className="profile-container">
                        <button 
                            className="profile-button"
                            onClick={handleProfileClick}
                        >
                            {isAuthenticated ? username?.toUpperCase() : 'PROFILE'}
                        </button>
                        {showDropdown && (
                            <div className="profile-dropdown">
                                {isAuthenticated ? (
                                    <>
                                        <Link to="/edit-profile" className="dropdown-item">
                                            EDIT PROFILE
                                        </Link>
                                        <button 
                                            className="dropdown-item"
                                            onClick={logout}
                                        >
                                            LOGOUT
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <Link to="/login" className="dropdown-item">
                                            LOGIN
                                        </Link>
                                        <Link to="/register" className="dropdown-item">
                                            REGISTER
                                        </Link>
                                    </>
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
  