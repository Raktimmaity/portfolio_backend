const Testimonial = require("./models/Testimonial");

const seedTestimonials = async () => {
  const items = [
    {
      name: "Anshu Poddar",
      role: "Student",
      avatar: "https://i.pravatar.cc/80?img=12",
      rating: 5,
      text:
        "In this site we get valuable and productive information about web development. In this site we get valuable and productive information about web development.",
      status: 0,
    },
    {
      name: "Anusuya Samanta",
      role: "Student",
      avatar: "https://i.pravatar.cc/80?img=32",
      rating: 4,
      text: "Very nice!",
      status: 0,
    },
    {
      name: "Soham Mathur",
      role: "Student",
      avatar: "https://i.pravatar.cc/80?img=25",
      rating: 5,
      text: "Your portfolio is a perfect blend of creativity and professionalism.",
      status: 0,
    },
    {
      name: "Anuran Maity",
      role: "Student",
      avatar: "https://i.pravatar.cc/80?img=45",
      rating: 4,
      text: "Gaining an excellent experience through your portfolio.",
      status: 0,
    },
  ];

  const ops = items.map((item) => ({
    updateOne: {
      filter: { name: item.name, text: item.text },
      update: { $setOnInsert: item },
      upsert: true,
    },
  }));

  await Testimonial.bulkWrite(ops);
};

module.exports = seedTestimonials;
