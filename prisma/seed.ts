import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const colleges = [
  {
    name: "Indian Institute of Technology Delhi",
    location: "Delhi",
    fees: 250000,
    rating: 4.8,
    placementPct: 95,
    exam: "JEE",
    cutoffRank: 1200,
    overview: "Top-tier engineering institute known for academics and research.",
    basicInfo: "Established in 1961, autonomous public technical university.",
    coursesOffered: "B.Tech, M.Tech, PhD",
    courses: [
      { name: "B.Tech CSE", duration: "4 years", annualFee: 250000 },
      { name: "B.Tech ECE", duration: "4 years", annualFee: 240000 },
    ],
    reviews: [
      { author: "Aarav", rating: 5, comment: "Excellent faculty and placements." },
      { author: "Riya", rating: 4, comment: "Strong peer group and campus life." },
    ],
  },
  {
    name: "National Institute of Technology Trichy",
    location: "Tamil Nadu",
    fees: 180000,
    rating: 4.6,
    placementPct: 91,
    exam: "JEE",
    cutoffRank: 8000,
    overview: "Premier NIT with strong technical programs and industry links.",
    basicInfo: "Public technical institute under Ministry of Education.",
    coursesOffered: "B.Tech, M.Tech, MBA",
    courses: [
      { name: "B.Tech Mechanical", duration: "4 years", annualFee: 180000 },
      { name: "B.Tech CSE", duration: "4 years", annualFee: 190000 },
    ],
    reviews: [
      { author: "Karan", rating: 5, comment: "Great infrastructure and alumni network." },
      { author: "Megha", rating: 4, comment: "Very good academics and opportunities." },
    ],
  },
  {
    name: "Birla Institute of Technology and Science Pilani",
    location: "Rajasthan",
    fees: 500000,
    rating: 4.7,
    placementPct: 93,
    exam: "BITSAT",
    cutoffRank: 280,
    overview: "Private deemed university with a strong innovation ecosystem.",
    basicInfo: "Renowned for flexible curriculum and practice school.",
    coursesOffered: "B.E., M.Sc, MBA",
    courses: [
      { name: "B.E. CSE", duration: "4 years", annualFee: 500000 },
      { name: "B.E. EEE", duration: "4 years", annualFee: 490000 },
    ],
    reviews: [
      { author: "Ishita", rating: 5, comment: "Excellent academic flexibility." },
      { author: "Dev", rating: 4, comment: "Good startup culture and peer quality." },
    ],
  },
  {
    name: "Delhi Technological University",
    location: "Delhi",
    fees: 220000,
    rating: 4.4,
    placementPct: 88,
    exam: "JEE",
    cutoffRank: 18000,
    overview: "Leading state technical university with strong placements.",
    basicInfo: "Large campus and diverse engineering branches.",
    coursesOffered: "B.Tech, M.Tech, MBA",
    courses: [
      { name: "B.Tech IT", duration: "4 years", annualFee: 220000 },
      { name: "B.Tech Software", duration: "4 years", annualFee: 225000 },
    ],
    reviews: [
      { author: "Ananya", rating: 4, comment: "Strong placements and active clubs." },
      { author: "Rohan", rating: 4, comment: "Good return on investment." },
    ],
  },
  {
    name: "Vellore Institute of Technology",
    location: "Tamil Nadu",
    fees: 320000,
    rating: 4.2,
    placementPct: 85,
    exam: "VITEEE",
    cutoffRank: 12000,
    overview: "Large private university with broad course offerings.",
    basicInfo: "Known for global tie-ups and modern campus.",
    coursesOffered: "B.Tech, M.Tech, Integrated Programs",
    courses: [
      { name: "B.Tech CSE", duration: "4 years", annualFee: 320000 },
      { name: "B.Tech AI", duration: "4 years", annualFee: 330000 },
    ],
    reviews: [
      { author: "Sanya", rating: 4, comment: "Good campus and exposure." },
      { author: "Nikhil", rating: 4, comment: "Decent placements with prep." },
    ],
  },
  {
    name: "Pune Institute of Computer Technology",
    location: "Maharashtra",
    fees: 150000,
    rating: 4.3,
    placementPct: 82,
    exam: "MHT-CET",
    cutoffRank: 2500,
    overview: "Reputed private engineering college with strong CS outcomes.",
    basicInfo: "Autonomous institute affiliated with SPPU.",
    coursesOffered: "B.E., M.E.",
    courses: [
      { name: "B.E. Computer", duration: "4 years", annualFee: 150000 },
      { name: "B.E. IT", duration: "4 years", annualFee: 145000 },
    ],
    reviews: [
      { author: "Om", rating: 4, comment: "Great coding environment." },
      { author: "Priya", rating: 4, comment: "Helpful professors and placement cell." },
    ],
  },
  {
    name: "Manipal Institute of Technology",
    location: "Karnataka",
    fees: 420000,
    rating: 4.1,
    placementPct: 80,
    exam: "MET",
    cutoffRank: 15000,
    overview: "Private institute with good infrastructure and opportunities.",
    basicInfo: "Part of MAHE, offers broad engineering specializations.",
    coursesOffered: "B.Tech, M.Tech",
    courses: [
      { name: "B.Tech Data Science", duration: "4 years", annualFee: 420000 },
      { name: "B.Tech CSE", duration: "4 years", annualFee: 430000 },
    ],
    reviews: [
      { author: "Rahul", rating: 4, comment: "Good facilities and vibrant campus." },
      { author: "Sneha", rating: 4, comment: "Plenty of opportunities if proactive." },
    ],
  },
  {
    name: "Jawaharlal Nehru Technological University Hyderabad",
    location: "Telangana",
    fees: 120000,
    rating: 3.9,
    placementPct: 74,
    exam: "TS EAMCET",
    cutoffRank: 18000,
    overview: "Popular university in Telangana with good value programs.",
    basicInfo: "Public university with multiple affiliated colleges.",
    coursesOffered: "B.Tech, M.Tech, MCA",
    courses: [
      { name: "B.Tech Civil", duration: "4 years", annualFee: 120000 },
      { name: "B.Tech ECE", duration: "4 years", annualFee: 130000 },
    ],
    reviews: [
      { author: "Teja", rating: 4, comment: "Affordable and practical programs." },
      { author: "Lavanya", rating: 3, comment: "Needs infrastructure upgrades." },
    ],
  },
];

async function main() {
  await prisma.review.deleteMany();
  await prisma.course.deleteMany();
  await prisma.college.deleteMany();

  for (const college of colleges) {
    const { courses, reviews, ...collegeData } = college;
    await prisma.college.create({
      data: {
        ...collegeData,
        courses: { create: courses },
        reviews: { create: reviews },
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
