import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebase";
import dynamic from "next/dynamic";

const UploadMcstructure = dynamic(() => import("../components/UploadMcstructure"), { ssr: false });

export default function UploadPage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsub();
  }, []);

  if (!user) return <p>Please log in to upload.</p>;

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Welcome {user.email}</h1>
      <UploadMcstructure userId={user.uid} />
    </div>
  );
}
