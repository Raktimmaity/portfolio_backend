const Visitor = require("../models/Visitor");

const getDayStartUtc = () => {
  const d = new Date();
  d.setUTCHours(0, 0, 0, 0);
  return d;
};

const recordVisit = async (req, res) => {
  try {
    const ip = req.ip || "";
    const userAgent = req.get("user-agent") || "";
    const fingerprint = `${ip}::${userAgent}`;
    const date = getDayStartUtc();

    await Visitor.findOneAndUpdate(
      { date, fingerprint },
      {
        $setOnInsert: { date, fingerprint, ip, userAgent },
      },
      { upsert: true }
    );

    res.json({ message: "Visit recorded" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const getVisitorStats = async (req, res) => {
  try {
    const days = Number(req.query.days) || 30;
    const start = new Date();
    start.setUTCHours(0, 0, 0, 0);
    start.setUTCDate(start.getUTCDate() - (days - 1));

    const stats = await Visitor.aggregate([
      { $match: { date: { $gte: start } } },
      { $group: { _id: "$date", count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ]);

    res.json(
      stats.map((s) => ({
        date: s._id,
        count: s.count,
      }))
    );
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { recordVisit, getVisitorStats };
