const Cv = require("../models/Cv");
const cloudinary = require("cloudinary").v2;

const ensureCloudinary = () => {
  const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;
  if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
    return false;
  }
  cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
    secure: true,
  });
  return true;
};

const extractCloudinaryInfo = (url) => {
  if (!url) return { publicId: "", format: "" };
  try {
    const { pathname } = new URL(url);
    const parts = pathname.split("/").filter(Boolean);
    if (parts.length < 4) return { publicId: "", format: "" };
    const resourceType = parts[1];
    const type = parts[2];
    let remainder = parts.slice(3);
    if (remainder[0] && /^s--.+--$/.test(remainder[0])) remainder = remainder.slice(1);
    if (remainder[0] && /^v\\d+$/.test(remainder[0])) remainder = remainder.slice(1);
    const joined = remainder.join("/");
    const match = joined.match(/^(.*)\\.([a-zA-Z0-9]+)$/);
    if (!match) return { publicId: joined, format: "", resourceType, type };
    return { publicId: match[1], format: match[2], resourceType, type };
  } catch (err) {
    return { publicId: "", format: "" };
  }
};

const getCv = async (req, res) => {
  try {
    let cv = await Cv.findOne();
    if (!cv) cv = await Cv.create({});
    res.json(cv);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const updateCv = async (req, res) => {
  try {
    const update = {
      fileUrl: req.body.fileUrl ?? "",
      fileName: req.body.fileName ?? "",
      isActive: typeof req.body.isActive === "boolean" ? req.body.isActive : true,
    };
    const cv = await Cv.findOneAndUpdate({}, update, { new: true, upsert: true });
    res.json({ message: "CV updated", cv });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const downloadCv = async (req, res) => {
  try {
    if (!ensureCloudinary()) {
      return res.status(500).json({ message: "Cloudinary config missing" });
    }
    let cv = await Cv.findOne();
    if (!cv) cv = await Cv.create({});
    if (!cv.isActive || !cv.fileUrl) {
      return res.status(404).json({ message: "CV not available" });
    }

    const { publicId, format, resourceType, type } = extractCloudinaryInfo(cv.fileUrl);
    if (!publicId) {
      return res.status(400).json({ message: "Invalid CV URL" });
    }

    const resource = resourceType || "raw";
    const initialType = type || "upload";
    const orderedCandidates =
      initialType === "upload"
        ? ["upload", "authenticated", "private"]
        : [initialType, "upload", "authenticated", "private"];
    const candidates = [...new Set(orderedCandidates.filter(Boolean))];

    const buildUrl = (candidate) =>
      cloudinary.url(publicId, {
        resource_type: resource,
        type: candidate,
        sign_url: true,
        expires_at: Math.floor(Date.now() / 1000) + 300,
        ...(format ? { format } : {}),
      });

    const headOk = async (url) => {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 5000);
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: { Range: "bytes=0-0" },
          signal: controller.signal,
        });
        return response.ok || response.status === 206;
      } catch (err) {
        return false;
      } finally {
        clearTimeout(timeout);
      }
    };

    for (const candidate of candidates) {
      const url = buildUrl(candidate);
      const ok = await headOk(url);
      if (ok) {
        return res.redirect(url);
      }
    }

    return res.status(404).json({ message: "CV not found" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getCv, updateCv, downloadCv };
