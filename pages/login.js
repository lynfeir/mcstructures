import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged
} from 'firebase/auth';
import { auth } from '../lib/firebase';

export default function Login() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Only run this on the client
    if (typeof window === 'undefined') return;

    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push('/upload');
      }
    });

    return () => unsub();
  }, []);

  const handleSubmit = async () => {
    setError('');
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, pass);
      } else {
        await createUserWithEmailAndPassword(auth, email, pass);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '2rem auto', padding: '1rem', border: '1px solid #ccc' }}>
      <h2>{isLogin ? 'Login' : 'Register'}</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
      />
      <input
        type="password"
        placeholder="Password"
        value={pass}
        onChange={(e) => setPass(e.target.value)}
        style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
      />
      <button onClick={handleSubmit} style={{ width: '100%', padding: '10px', marginBottom: '10px' }}>
        {isLogin ? 'Login' : 'Sign Up'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <p
        onClick={() => setIsLogin(!isLogin)}
        style={{ color: 'blue', cursor: 'pointer', textAlign: 'center' }}
      >
        {isLogin ? 'Need an account? Register here' : 'Already have an account? Log in'}
      </p>
    </div>
  );
}
