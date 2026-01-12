require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/adminRoutes");
const visitorRoutes = require("./routes/visitorRoutes");
const contactRoutes = require("./routes/contactRoutes");
const seedTestimonials = require("./seedTestimonials");
const testimonialsRoutes = require("./routes/testimonialsRoutes");
const projectsRoutes = require("./routes/projectsRoutes");

const app = express();
app.use(express.json());
// ✅ Proper CORS configuration
const allowedOrigins = [
  "http://localhost:5173",
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use("/api/admin", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/visitor", visitorRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/testimonials", testimonialsRoutes);
app.use("/api/projects", projectsRoutes);

const PORT = process.env.PORT || 5000;
const MONGO = process.env.MONGO_URI;

app.get("/", (req, res) => {
  res.send("API is running...");
});

mongoose.connect(MONGO, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Mongo connected");
    // seedTestimonials().catch((err) => console.error("Seed testimonials error:", err));
    app.listen(PORT, () => console.log("Server listening on", PORT));
  })
  .catch((err) => {
    console.error("Mongo connect error:", err);
  });
