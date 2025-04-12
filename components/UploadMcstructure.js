import { UploadButton } from "@uploadthing/react";

export default function UploadMcstructure({ userId }) {
  return (
    <div>
      <h3>Select a .mcstructure file to upload</h3>
      <UploadButton
        endpoint="structureUploader"
        onClientUploadComplete={(res) => {
          alert("Upload complete!");
          console.log(res);
        }}
        onUploadError={(error) => {
          console.error("Upload error:", error);
          alert("Upload failed!");
        }}
        headers={{
          "x-user-id": userId,
        }}
      />
    </div>
  );
}
