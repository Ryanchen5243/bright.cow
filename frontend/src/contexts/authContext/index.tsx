import {createContext, useContext, useState, useEffect, type ReactNode} from "react";
import { auth } from "../../firebase/firebase";
import { onAuthStateChanged, type User } from "firebase/auth";

const AUTH_LOADING_DELAY_MS = 5500;

const AuthContext = createContext<{
    currentUser: User | null;
    loading: boolean;
} | undefined>(undefined);

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

export function AuthProvider({ children }: { children: ReactNode }) {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, initializeUser);
        return () => unsubscribe();
    }, []);
    async function initializeUser(user: User | null) {
        const shouldShowAuthLoading = Boolean(user);

        if (shouldShowAuthLoading) {
            setLoading(true);
        }

        if (user) {
            setCurrentUser(user);
        } else {
            setCurrentUser(null);
        }

        if (shouldShowAuthLoading) {
            await new Promise((resolve) => setTimeout(resolve, AUTH_LOADING_DELAY_MS));
        }

        setLoading(false);
    }
    const value = {
        currentUser,
        loading
    };
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}


export default AuthContext;