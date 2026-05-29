import { useState } from 'react';
import { doCreateUserWithEmailAndPassword, doSignInWithEmailAndPassword, doSignInWithGoogle } from '../firebase/auth.ts';

export default function Login() {
    const [mode, setMode] = useState<'signin' | 'signup'>('signin');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isSigningIn, setIsSigningIn] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isSigningIn) {
            if (mode === 'signup' && password !== confirmPassword) {
                setErrorMessage('Passwords do not match. Please try again.');
                return;
            }

            setErrorMessage('');
            setIsSigningIn(true);

            const action = mode === 'signup'
                ? doCreateUserWithEmailAndPassword(email, password)
                : doSignInWithEmailAndPassword(email, password);

            await action.catch((error: Error) => {
                setErrorMessage(error.message);
                setIsSigningIn(false);
            });
        }
    };

    const onGoogleSignIn = async () => {
        if (!isSigningIn) {
            setErrorMessage('');
            setIsSigningIn(true);
            await doSignInWithGoogle().catch((error: Error) => {
                setErrorMessage(error.message);
                setIsSigningIn(false);
            });
        }
    };

    const switchMode = (nextMode: 'signin' | 'signup') => {
        setMode(nextMode);
        setErrorMessage('');
        setPassword('');
        setConfirmPassword('');
    };

    return (
        <section className="login-page">
            <div className="login-shell">
                <div className="login-intro">
                    <p className="login-eyebrow">UWU~VIBE</p>
                    <h1>{mode === 'signin' ? 'Welcome back' : 'Create your account'}</h1>
                    <p className="login-subtitle">
                        {mode === 'signin'
                            ? 'Sign in to manage your profile, sessions, and creator activity.'
                            : 'Sign up with email and password to get started on your creator profile.'}
                    </p>
                </div>

                <form onSubmit={onSubmit} className="login-form">
                    <div className="login-mode-toggle" role="tablist" aria-label="Authentication mode">
                        <button
                            type="button"
                            className={mode === 'signin' ? 'active' : ''}
                            onClick={() => switchMode('signin')}
                            aria-pressed={mode === 'signin'}
                        >
                            Sign In
                        </button>
                        <button
                            type="button"
                            className={mode === 'signup' ? 'active' : ''}
                            onClick={() => switchMode('signup')}
                            aria-pressed={mode === 'signup'}
                        >
                            Sign Up
                        </button>
                    </div>

                    <h2>{mode === 'signin' ? 'Sign in' : 'Create account'}</h2>

                    <div className="login-input-group">
                        <label htmlFor="login-email">Email</label>
                        <input
                            id="login-email"
                            type="email"
                            placeholder="you@startup.com"
                            value={email}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                            autoComplete="email"
                            required
                        />
                    </div>

                    <div className="login-input-group">
                        <label htmlFor="login-password">Password</label>
                        <input
                            id="login-password"
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                            autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
                            required
                        />
                    </div>

                    {mode === 'signup' && (
                        <div className="login-input-group">
                            <label htmlFor="login-confirm-password">Confirm Password</label>
                            <input
                                id="login-confirm-password"
                                type="password"
                                placeholder="Re-enter your password"
                                value={confirmPassword}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
                                autoComplete="new-password"
                                required
                            />
                        </div>
                    )}

                    <button type="submit" disabled={isSigningIn} className="login-primary-button">
                        {isSigningIn
                            ? (mode === 'signin' ? 'Signing in...' : 'Creating account...')
                            : (mode === 'signin' ? 'Sign In' : 'Create Account')}
                    </button>

                    <button type="button" onClick={onGoogleSignIn} disabled={isSigningIn} className="login-secondary-button">
                        {mode === 'signin' ? 'Continue with Google' : 'Sign up with Google'}
                    </button>

                    <p className="login-muted-text">
                        {mode === 'signin' ? 'Need an account?' : 'Already have an account?'}{' '}
                        <button
                            type="button"
                            className="login-link-button"
                            onClick={() => switchMode(mode === 'signin' ? 'signup' : 'signin')}
                            disabled={isSigningIn}
                        >
                            {mode === 'signin' ? 'Sign up' : 'Sign in'}
                        </button>
                    </p>

                    {errorMessage && <p className="login-error-message">{errorMessage}</p>}
                </form>
            </div>
        </section>
    );
}