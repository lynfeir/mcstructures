import { useState } from "react";
import { uploadFiles } from "uploadthing/client";

export default function UploadMcstructure({ userId }) {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first");
      return;
    }

    setStatus("Uploading...");

    try {
      const res = await uploadFiles("structureUploader", {
        files: [file],
        headers: {
          "x-user-id": userId,
        },
      });

      setStatus("Upload complete ✅");
      console.log("Uploaded file info:", res);
    } catch (err) {
      console.error("Upload failed:", err);
      setStatus("Upload failed ❌");
    }
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: "1rem", marginTop: "1rem" }}>
      <input
        type="file"
        accept=".mcstructure"
        onChange={(e) => setFile(e.target.files?.[0])}
        style={{ marginBottom: "1rem" }}
      />
      <br />
      <button
        onClick={handleUpload}
        disabled={!file}
        style={{
          padding: "10px 20px",
          backgroundColor: "#4f46e5",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Upload
      </button>
      <p style={{ marginTop: "1rem" }}>{status}</p>
    </div>
  );
}
