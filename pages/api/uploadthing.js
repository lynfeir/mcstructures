import { createUploadthing, createUploadthingHandler } from "uploadthing/server";

// Setup your endpoint config
const f = createUploadthing();

const fileRouter = {
  structureUploader: f({
    "application/octet-stream": { maxFileSize: "4MB" }, // accepts .mcstructure files
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

// Required for Next.js to stream file uploads
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST" && req.method !== "GET") {
    res.setHeader("Allow", ["POST", "GET"]);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  return createUploadthingHandler({
    router: fileRouter,
  })(req, res);
}
