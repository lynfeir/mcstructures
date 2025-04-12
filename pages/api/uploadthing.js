import { createUploadthing, createUploadthingHandler } from "uploadthing/server";

// 1. Define the upload endpoint
const f = createUploadthing();

const fileRouter = {
  structureUploader: f({
    // Accept any file (like .mcstructure)
    "application/octet-stream": { maxFileSize: "4MB" },
  })
    .middleware(async ({ req }) => {
      const userId = req.headers["x-user-id"];
      if (!userId) throw new Error("Unauthorized");
      return { userId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("✅ Upload complete for user:", metadata.userId);
      console.log("📁 File URL:", file.url);
    }),
};

// 2. Setup the Next.js API route
export const config = {
  api: {
    bodyParser: false, // Required for file uploads
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST" && req.method !== "GET") {
    res.setHeader("Allow", ["POST", "GET"]);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  return createUploadthingHandler({ router: fileRouter })(req, res);
}
