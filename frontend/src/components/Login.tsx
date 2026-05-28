import { useState, useEffect } from 'react';
// @ts-ignore
import { doSignInWithEmailAndPassword, doSignInWithGoogle } from '../firebase/auth';
import { useAuth } from '../contexts/authContext';
import { useNavigate } from 'react-router-dom';
export default function Login() {
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSigningIn, setIsSigningIn] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (currentUser) {
            // Redirect to the application page or perform any other action
            navigate('/app');
        }
    }, [currentUser, navigate]);

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isSigningIn) {
            setIsSigningIn(true);
            await doSignInWithEmailAndPassword(email, password).catch((error: Error) => {
                setErrorMessage(error.message);
                setIsSigningIn(false);
            });
        }
    };
    const onGoogleSignIn = async () => {
        if (!isSigningIn) {
            setIsSigningIn(true);
            await doSignInWithGoogle().catch((error: Error) => {
                setErrorMessage(error.message);
                setIsSigningIn(false);
            });
        }
    };

    return (
        <>
            <div>Login Page </div>
            <form onSubmit={onSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                />
                <button type="submit" disabled={isSigningIn}>
                    Sign In
                </button>
                <button type="button" onClick={onGoogleSignIn} disabled={isSigningIn}>
                    Sign In with Google
                </button>
                {errorMessage && <p>{errorMessage}</p>}
            </form>
        </>
    );
}