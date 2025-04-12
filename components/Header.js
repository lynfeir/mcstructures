import Link from 'next/link';
import { useEffect, useState } from 'react';
import { auth } from '../lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

export default function Header() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsub();
  }, []);

  return (
    <header style={{ padding: '1rem', borderBottom: '1px solid #ccc', marginBottom: '2rem' }}>
      <Link href="/" style={{ marginRight: '1rem' }}>Home</Link>
      {user && <Link href="/upload" style={{ marginRight: '1rem' }}>Upload</Link>}
      {user ? (
        <>
          <span style={{ marginRight: '1rem' }}>Welcome {user.email}</span>
          <button onClick={() => signOut(auth)}>Sign Out</button>
        </>
      ) : (
        <Link href="/login">Login</Link>
      )}
    </header>
  );
}
