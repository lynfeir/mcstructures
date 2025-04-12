import { createUploadthing, createNextHandler } from "uploadthing/next";

const f = createUploadthing();

const fileRouter = {
  structureUploader: f({
    mcstructure: { maxFileSize: "4MB" },
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

export default createNextHandler({
  router: fileRouter,
});

export const config = {
  api: {
    bodyParser: false,
  },
};
