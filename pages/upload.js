import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebase";
import dynamic from "next/dynamic";
import Header from "../components/Header";

const UploadMcstructure = dynamic(() => import("../components/UploadMcstructure"), { ssr: false });

export default function UploadPage() {
  const [user, setUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setCheckingAuth(false);
      if (!currentUser) {
        router.push("/login"); // ✅ redirect to login
      }
    });
    return () => unsub();
  }, [router]);

  if (checkingAuth) return <p>Loading...</p>;

  return (
    <div style={{ padding: "1rem" }}>
      <Header />
      <h1>Welcome {user?.email}</h1>
      <UploadMcstructure userId={user.uid} />
    </div>
  );
}
