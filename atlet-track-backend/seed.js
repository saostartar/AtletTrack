import bcrypt from "bcrypt";
import db from "./models/index.js";

const seed = async () => {
  try {
    await db.sequelize.sync({ force: false });

    // create admin account
    const adminUsername = "admin";
    const adminPassword = "password";
    const hashedAdminPassword = await bcrypt.hash(adminPassword, 10);

    const admin = await db.Admin.create({
      username: adminUsername,
      password: hashedAdminPassword,
    });

    console.log(`Admin created: 
            - Username: ${admin.username}
            - Password: ${adminPassword}`);

    process.exit();
  } catch (error) {
    console.error("Error Seeding data: ", error);
    process.exit(1);
  }
};

seed();