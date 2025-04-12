import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Welcome to MCStructure Hub</h1>
      <p>
        This is a site for uploading and sharing your <code>.mcstructure</code> files.
      </p>

      <div style={{ marginTop: '1.5rem' }}>
        <Link href="/login">
          <button style={{ padding: '10px 20px', marginRight: '10px' }}>Log In / Sign Up</button>
        </Link>
        <Link href="/upload">
          <button style={{ padding: '10px 20px' }}>Upload File</button>
        </Link>
      </div>
    </div>
  );
}
