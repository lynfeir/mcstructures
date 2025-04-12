import { UploadButton } from "@uploadthing/react";

export default function UploadMcstructure({ userId }) {
  return (
    <div style={{ padding: "1rem", border: "1px solid #ccc" }}>
      <h3>Upload a .mcstructure file</h3>
      <UploadButton
        endpoint="structureUploader"
        headers={{
          "x-user-id": userId,
        }}
        onClientUploadComplete={(res) => {
          console.log("✅ Upload successful:", res);
          alert("Upload complete!");
        }}
        onUploadError={(error) => {
          console.error("❌ Upload error:", error);
          alert("Upload failed. See console for details.");
        }}
        appearance={{
          button: {
            padding: "10px 20px",
            borderRadius: "4px",
            backgroundColor: "#4f46e5",
            color: "white",
            border: "none",
            cursor: "pointer",
          },
        }}
      />
    </div>
  );
}
