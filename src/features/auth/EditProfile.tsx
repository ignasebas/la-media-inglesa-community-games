import { useState, FormEvent, useEffect } from 'react';
import { useAuth } from './../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

function EditProfile() {
    const { username, email, updateProfile, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    
    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);

    const [formData, setFormData] = useState({
        username: username || '',
        email: email || '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            await updateProfile({
                username: formData.username,
                email: formData.email,
            });
            setSuccess('Profile updated successfully!');
            setTimeout(() => {
                navigate('/');
            }, 2000);
        } catch (err) {
            setError('Failed to update profile');
        }
    };

    return (
        <div className="edit-profile-container">
            <h2>Edit Profile</h2>
            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}
            
            <form onSubmit={handleSubmit} className="edit-profile-form">
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-actions">
                    <button type="submit" className="save-button">
                        Save Changes
                    </button>
                    <button 
                        type="button" 
                        className="cancel-button"
                        onClick={() => navigate('/')}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}

export default EditProfile; 