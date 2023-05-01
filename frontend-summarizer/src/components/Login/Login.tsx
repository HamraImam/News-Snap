import React, { useState, useRef, useEffect, MouseEvent } from 'react';
import LoginForm from './LoginForm';
import "../../styles/Login.css";
import { auth } from '../../firebase';
import { User } from '@firebase/auth';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';


const Login = () => {
  const [loggedInUser, setLoggedInUser] = useState<null | { email: string; initial: string }>(null);
  const [showLogout, setShowLogout] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const userCircleRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');



   // Add a new function to render the user info and logout button

   const handleLogin = async (email: string, password: string): Promise<string | null> => {
    setIsLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const { user } = userCredential;
      if (user) {
        setLoggedInUser({ email: user.email as string, initial: user.email?.charAt(0).toUpperCase() as string });
        setShowLoginPopup(false);
      }
    } catch (error: any) {
      console.error('Error signing in:', error);
      setIsLoading(false);
      return error.message.replace('Firebase: ', ''); // Remove "Firebase: " from the error message
    }
    setIsLoading(false);
    return null;
  };
  
  const handleSignUp = async (email: string, password: string): Promise<string | null> => {
    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const { user } = userCredential;
      if (user) {
        setLoggedInUser({ email: user.email as string, initial: user.email?.charAt(0).toUpperCase() as string });
        setShowLoginPopup(false);
      }
    } catch (error: any) {
      console.error('Error signing up:', error);
      setIsLoading(false);
      return error.message.replace('Firebase: ', ''); // Remove "Firebase: " from the error message
    }
    setIsLoading(false);
    return null;
  };
  


  const handleLogout = async () => {
    try {
      await auth.signOut();
      setLoggedInUser(null);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const toggleLogout = (e: MouseEvent) => {
    e.stopPropagation();
    if (loggedInUser) {
    setShowLogout(!showLogout);
  }
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (userCircleRef.current && !userCircleRef.current.contains(e.target as Node)) {
      setShowLogout(false);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user: User | null) => {
      if (user) {
        setLoggedInUser({ email: user.email as string, initial: user.email?.charAt(0).toUpperCase() as string });
      } else {
        setLoggedInUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside as any);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside as any);
    };
  }, []);

  return (
    <div className="login">
      
      {loggedInUser ? (
        <div className="user-circle-container" ref={userCircleRef}>
          <div className="user-circle" onClick={toggleLogout}>
            {loggedInUser.initial}
          </div>
          {showLogout && (
          <div className="logout-container">
            <div className="email-text">Email</div> {/* Added the word "Email" */}
            <div className="logout-email">{loggedInUser.email}</div>
            <div className="logout-divider"></div>
            <div className="logout-text" onClick={handleLogout}>Logout</div>
          </div>
        )}
        </div>
      ) : (
        <>
          <button
            onClick={() => {
              setShowSignUp(false);
              setShowLoginPopup(true);
            }}
          >
            Sign In
          </button>
          {showLoginPopup && (
            <div>
              <div className="overlay" onClick={() => setShowLoginPopup(false)}></div>
              <div className="login-popup">
                <LoginForm
                  showSignUp={showSignUp}
                  onToggleSignUp={() => setShowSignUp(!showSignUp)}
                  onLogin={handleLogin}
                  onSignUp={handleSignUp}
                />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
          } 
  export default Login;
          