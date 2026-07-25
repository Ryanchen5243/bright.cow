import {createContext, useContext, useState, useEffect, type ReactNode} from "react";
import { auth } from "../../firebase/firebase";
import { onAuthStateChanged, type User } from "firebase/auth";

const AuthContext = createContext<{
    currentUser: User | null;
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

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user ?? null);
        });
        return () => unsubscribe();
    }, []);

    const value = {
        currentUser,
    };
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}


export default AuthContext;