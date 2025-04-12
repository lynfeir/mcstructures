import { createUploadthing, createUploadthingExpressHandler } from 'uploadthing/express'; // use express version
import { IncomingForm } from 'formidable';

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

// Actual handler
export const config = {
  api: {
    bodyParser: false, // important for uploads
  },
};

export default async function handler(req, res) {
  if (req.method === 'POST' || req.method === 'GET') {
    return createUploadthingExpressHandler({ router: fileRouter })(req, res);
  } else {
    res.setHeader('Allow', ['POST', 'GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
