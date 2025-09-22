const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("../models/User");
const Project = require("../models/Project");
const Contact = require("../models/Contact");

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    // Clear existing data
    await User.deleteMany({});
    await Project.deleteMany({});
    await Contact.deleteMany({});

    // Create admin user
    const adminUser = new User({
      name: "David Katz",
      email: "david@handymench.com",
      password: await bcrypt.hash("admin123", 12),
      role: "admin",
    });
    await adminUser.save();

    // Create sample contacts
    const contacts = await Contact.insertMany([
      {
        contactType: "Subcontractor",
        company: "ABC Construction",
        contactName: "John Smith",
        phone: "555-0123",
        email: "john@abcconstruction.com",
        tradeSpecialty: "General Construction",
      },
      {
        contactType: "Subcontractor",
        company: "XYZ Electrical",
        contactName: "Jane Doe",
        phone: "555-0456",
        email: "jane@xyzelectrical.com",
        tradeSpecialty: "Electrical",
      },
      {
        contactType: "Client",
        company: "KBR",
        contactName: "Mike Johnson",
        phone: "555-0789",
        email: "mike@kbr.com",
        tradeSpecialty: "Owner Rep",
      },
    ]);

    // Create sample projects
    const projects = await Project.insertMany([
      {
        projectId: "PROJ-001",
        name: "K & L",
        client: "KBR",
        manager: adminUser._id,
        awardAmount: 123000,
        spentToDate: 45000,
        startDate: new Date("2025-08-12"),
        status: "active",
        description: "Commercial building renovation",
      },
      {
        projectId: "PROJ-002",
        name: "Office Renovation",
        client: "Tech Corp",
        manager: adminUser._id,
        awardAmount: 85000,
        spentToDate: 85000,
        progress: 100,
        startDate: new Date("2025-06-01"),
        endDate: new Date("2025-07-30"),
        status: "completed",
        description: "Office space modernization",
      },
    ]);

    console.log("Database seeded successfully!");
    console.log(`Admin user created: david@handymench.com / admin123`);
    console.log(`Projects created: ${projects.length}`);
    console.log(`Contacts created: ${contacts.length}`);

    process.exit(0);
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
};

seedData();
