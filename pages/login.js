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
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) router.push('/upload');
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
    <div style={{ maxWidth: 400, margin: '2rem auto' }}>
      <h2>{isLogin ? 'Login' : 'Register'}</h2>
      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        style={{ width: '100%', marginBottom: '10px' }}
      />
      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setPass(e.target.value)}
        value={pass}
        style={{ width: '100%', marginBottom: '10px' }}
      />
      <button onClick={handleSubmit}>
        {isLogin ? 'Login' : 'Sign up'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <p
        style={{ color: 'blue', cursor: 'pointer', marginTop: '10px' }}
        onClick={() => setIsLogin(!isLogin)}
      >
        {isLogin ? 'Need an account? Register' : 'Have an account? Log in'}
      </p>
    </div>
  );
}
