// require("dotenv").config();
// const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");
// const User = require("./models/User");

// async function run() {
//   await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

//   const email = process.env.DEFAULT_ADMIN_EMAIL || "admin@example.com";
//   const raw = process.env.DEFAULT_ADMIN_PASSWORD || "admin1234";

//   const exists = await User.findOne({ email });
//   if (exists) {
//     console.log("Admin already exists:", email);
//     process.exit(0);
//   }

//   const hashed = await bcrypt.hash(raw, 10);
//   const user = new User({ name: "Super Admin", email, password: hashed, role: "admin" });
//   await user.save();
//   console.log("Default admin created:", email);
//   process.exit(0);
// }

// run().catch(err => {
//   console.error(err);
//   process.exit(1);
// });
