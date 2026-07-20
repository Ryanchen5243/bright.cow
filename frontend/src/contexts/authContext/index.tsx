import {createContext, useContext, useState, useEffect, type ReactNode} from "react";
import { auth } from "../../firebase/firebase";
import { onAuthStateChanged, type User } from "firebase/auth";

const AuthContext = createContext<{
    currentUser: User | null;
    isAuthLoading: boolean;
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
    const [isAuthLoading, setIsAuthLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user ?? null);
            setIsAuthLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const value = {
        currentUser,
        isAuthLoading,
    };
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}


export default AuthContext;
