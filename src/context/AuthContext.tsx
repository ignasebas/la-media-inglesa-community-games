import { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
    isAuthenticated: boolean;
    username: string | null;
    email: string | null;
    login: (email: string, password: string) => Promise<void>;
    signup: (email: string, password: string) => Promise<void>;
    logout: () => void;
    updateProfile: (data: { username?: string; email?: string }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState<string | null>(null);
    const [email, setEmail] = useState<string | null>(null);

    const login = async (email: string, password: string) => {
        // TODO: Implement actual authentication logic
        console.log(`Logging in with email: ${email}`);
        setIsAuthenticated(true);
        setUsername(email.split('@')[0]);
        setEmail(email);
    };

    const signup = async (email: string, password: string) => {
        // TODO: Implement actual signup logic
        console.log(`Signing up with email: ${email}`);
        setIsAuthenticated(true);
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUsername(null);
        setEmail(null);
    };

    const updateProfile = async (data: { username?: string; email?: string }) => {
        // TODO: Implement actual update logic with backend
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