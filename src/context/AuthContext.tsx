import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface AuthContextType {
    isAuthenticated: boolean;
    username: string | null;
    email: string | null;
    login: (email: string, password: string) => Promise<void>;
    signup: (email: string, password: string, username: string) => Promise<void>;
    logout: () => void;
    updateProfile: (data: { username?: string; email?: string }) => Promise<void>;
}

interface AuthResponse {
    accessToken: string;
    username: string;
    email: string;
}

const API_URL = 'http://127.0.0.1:5000';

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState<string | null>(null);
    const [email, setEmail] = useState<string | null>(null);
    const [accessToken, setAccessToken] = useState<string | null>(null);

    // Function to refresh the access token
    const refreshAccessToken = async () => {
        try {
            const response = await fetch(`${API_URL}/refresh`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                throw new Error('Token refresh failed');
            }

            const data: AuthResponse = await response.json();
            setAccessToken(data.accessToken);
            setUsername(data.username);
            setEmail(data.email);
            setIsAuthenticated(true);
            return data.accessToken;
        } catch (error) {
            setIsAuthenticated(false);
            setUsername(null);
            setEmail(null);
            setAccessToken(null);
            throw error;
        }
    };

    // Try to refresh token on initial load
    useEffect(() => {
        const initAuth = async () => {
            try {
                await refreshAccessToken();
            } catch (error) {
                // Silent fail on initial load
                console.log('No valid refresh token');
            }
        };
        initAuth();
    }, []);

    const login = async (email: string, password: string) => {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            throw new Error('Login failed');
        }

        const data: AuthResponse = await response.json();
        setAccessToken(data.accessToken);
        setIsAuthenticated(true);
        setUsername(data.username);
        setEmail(data.email);
    };

    const signup = async (email: string, password: string, username: string) => {
        const response = await fetch(`${API_URL}/register`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password, username }),
        });

        if (!response.ok) {
            throw new Error('Signup failed');
        }

        const data: AuthResponse = await response.json();
        setAccessToken(data.accessToken);
        setIsAuthenticated(true);
        setUsername(username);
        setEmail(email);
    };

    const logout = async () => {
        try {
            await fetch(`${API_URL}/logout`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            });
        } catch (error) {
            console.error('Logout failed:', error);
        } finally {
            setIsAuthenticated(false);
            setUsername(null);
            setEmail(null);
            setAccessToken(null);
        }
    };

    const updateProfile = async (data: { username?: string; email?: string }) => {
        const response = await fetch(`${API_URL}/user/edit`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            // If token expired, try to refresh and retry the request
            if (response.status === 401) {
                try {
                    const newToken = await refreshAccessToken();
                    // Retry the request with new token
                    const retryResponse = await fetch(`${API_URL}/user/edit`, {
                        method: 'PUT',
                        credentials: 'include',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${newToken}`,
                        },
                        body: JSON.stringify(data),
                    });

                    if (!retryResponse.ok) {
                        throw new Error('Profile update failed');
                    }

                    if (data.username) setUsername(data.username);
                    if (data.email) setEmail(data.email);
                    return;
                } catch (error) {
                    throw new Error('Profile update failed');
                }
            }
            throw new Error('Profile update failed');
        }

        if (data.username) setUsername(data.username);
        if (data.email) setEmail(data.email);
    };

    return (
        <AuthContext.Provider value={{ 
            isAuthenticated, 
            username,
            email,
            login, 
            signup, 
            logout,
            updateProfile
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
} 