import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../lib/firebase';

export default function UploadPage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsub();
  }, []);

  if (!user) {
    return <p style={{ padding: '1rem' }}>Please log in to upload.</p>;
  }

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Welcome {user.email}</h1>
      {/* Upload component will go here next */}
    </div>
  );
}
