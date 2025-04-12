import { createUploadthing, createNextPageApiHandler } from "uploadthing/server";

const f = createUploadthing();

const fileRouter = {
  structureUploader: f({
    // Accept .mcstructure as binary file
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

export const config = {
  api: {
    bodyParser: false, // required for uploads to work
  },
};

export default createNextPageApiHandler({
  router: fileRouter,
});
