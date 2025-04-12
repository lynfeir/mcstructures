import { useState } from "react";
import { uploadFiles } from "uploadthing/client";

export default function UploadMcstructure({ userId }) {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file");
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

      console.log("✅ Upload result:", res);
      setStatus("Upload complete ✅");
    } catch (err) {
      console.error("❌ Upload failed:", err);
      setStatus("Upload failed ❌");
    }
  };

  return (
    <div>
      <input
        type="file"
        accept=".mcstructure"
        onChange={(e) => setFile(e.target.files?.[0])}
        style={{ marginBottom: "1rem" }}
      />
      <br />
      <button onClick={handleUpload} disabled={!file}>
        Upload
      </button>
      <p>{status}</p>
    </div>
  );
}
