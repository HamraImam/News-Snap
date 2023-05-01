import React, { useState } from 'react';
import "../../styles/Login.css";

interface LoginFormProps {
  showSignUp: boolean;
  onToggleSignUp: () => void;
  onLogin: (email: string, password: string) => Promise<string | null>;
  onSignUp: (email: string, password: string) => Promise<string | null>;
}

const LoginForm: React.FC<LoginFormProps> = ({
  showSignUp,
  onToggleSignUp,
  onLogin,
  onSignUp,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    let errorMessage: string | null;
    if (showSignUp) {
      errorMessage = await onSignUp(email, password);
    } else {
      errorMessage = await onLogin(email, password);
    }
    if (errorMessage) {
      setError(errorMessage);
    }
  };

  return (
    <div className="login-form">
      <h2>{showSignUp ? 'Sign Up' : 'Log in'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">{showSignUp ? 'Sign Up' : 'Log in'}</button>
      </form>
      {error && <p className="error-message">{error}</p>}
      {showSignUp ? (
        <p>
          Already have an account?{' '}
          <span className="login-signup-text" onClick={onToggleSignUp}>
            Login
          </span>
        </p>
      ) : (
        <p>
          Don't have an account?{' '}
          <span className="login-signup-text" onClick={onToggleSignUp}>
            Sign Up
          </span>
        </p>
      )}
    </div>
  );
};

export default LoginForm;
