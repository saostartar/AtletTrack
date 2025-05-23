// models/index.js
import { Sequelize } from "sequelize";
import { dbConfig } from "../config/config.js";
import AdminModel from "./Admin.js";
import KoordinatorModel from "./Koordinator.js";
import AtletModel from "./Atlet.js";
import ActivityLogModel from "./ActivityLog.js";
import EvaluasiModel from "./Evaluasi.js";
import PesanModel from "./Pesan.js";
import PencapaianModel from "./Pencapaian.js";
import ConversationModel from "./Conversation.js"; // Import Conversation model
import KatalogLatihanModel from "./KatalogLatihan.js";
import OpsiLatihanModel from "./OpsiLatihan.js";
import LatihanAtletModel from "./LatihanAtlet.js";

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  port: dbConfig.PORT,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Models
db.Admin = AdminModel(sequelize, Sequelize);
db.Koordinator = KoordinatorModel(sequelize, Sequelize);
db.Atlet = AtletModel(sequelize, Sequelize);
db.ActivityLog = ActivityLogModel(sequelize, Sequelize);
db.Evaluasi = EvaluasiModel(sequelize, Sequelize);
db.Pesan = PesanModel(sequelize, Sequelize);
db.Pencapaian = PencapaianModel(sequelize, Sequelize);
db.Conversation = ConversationModel(sequelize, Sequelize);
db.KatalogLatihan = KatalogLatihanModel(sequelize, Sequelize);
db.OpsiLatihan = OpsiLatihanModel(sequelize, Sequelize);
db.LatihanAtlet = LatihanAtletModel(sequelize, Sequelize);

// Associations
// Admin and Koordinator
db.Admin.hasMany(db.Koordinator, { foreignKey: "adminId" });
db.Koordinator.belongsTo(db.Admin, { foreignKey: "adminId" });

// Admin and ActivityLog
db.Admin.hasMany(db.ActivityLog, { foreignKey: "adminId" });
db.ActivityLog.belongsTo(db.Admin, { foreignKey: "adminId" });

// Koordinator and ActivityLog
db.Koordinator.hasMany(db.ActivityLog, { foreignKey: "koordinatorId" });
db.ActivityLog.belongsTo(db.Koordinator, { foreignKey: "koordinatorId" });

// Koordinator and Atlet
db.Koordinator.hasMany(db.Atlet, { foreignKey: "koordinatorId" });
db.Atlet.belongsTo(db.Koordinator, { foreignKey: "koordinatorId" });

// Koordinator and Evaluasi
db.Koordinator.hasMany(db.Evaluasi, {
  foreignKey: "koordinatorId",
  as: "evaluasi",
});
db.Evaluasi.belongsTo(db.Koordinator, {
  foreignKey: "koordinatorId",
  as: "koordinator",
});

// Evaluasi and Atlet
db.Atlet.hasMany(db.Evaluasi, {
  foreignKey: "atletId",
  as: "evaluasi",
});
db.Evaluasi.belongsTo(db.Atlet, {
  foreignKey: "atletId",
  as: "atlet",
});

// Activity Logs
db.Admin.hasMany(db.ActivityLog, { foreignKey: "adminId" });
db.Koordinator.hasMany(db.ActivityLog, { foreignKey: "koordinatorId" });

// Pencapaian and Atlet/Koordinator
db.Atlet.hasMany(db.Pencapaian, { foreignKey: "atletId", as: "pencapaians" });
db.Pencapaian.belongsTo(db.Atlet, { foreignKey: "atletId", as: "atlet" });

db.Koordinator.hasMany(db.Pencapaian, {
  foreignKey: "koordinatorId",
  as: "pencapaians",
});
db.Pencapaian.belongsTo(db.Koordinator, {
  foreignKey: "koordinatorId",
  as: "koordinator",
});

// Conversation and Pesan
db.Conversation.belongsTo(db.Koordinator, {
  foreignKey: "koordinatorId",
  as: "Koordinator", // Uppercase to match model associations
});
db.Koordinator.hasMany(db.Conversation, {
  foreignKey: "koordinatorId",
  as: "conversations",
});

db.Conversation.belongsTo(db.Atlet, {
  foreignKey: "atletId",
  as: "Atlet", // Uppercase to match model associations
});
db.Atlet.hasMany(db.Conversation, {
  foreignKey: "atletId",
  as: "conversations",
});

// Messages in Conversation
db.Pesan.belongsTo(db.Conversation, {
  foreignKey: "conversationId",
  as: "conversation",
});
db.Conversation.hasMany(db.Pesan, {
  foreignKey: "conversationId",
  as: "pesans",
});

// Message participant associations
db.Pesan.belongsTo(db.Koordinator, {
  foreignKey: "koordinatorId",
  as: "Koordinator", // Uppercase to match model associations
});
db.Pesan.belongsTo(db.Atlet, {
  foreignKey: "atletId",
  as: "Atlet", // Uppercase to match model associations
});

db.Koordinator.hasMany(db.KatalogLatihan, { foreignKey: "koordinatorId" });
db.KatalogLatihan.belongsTo(db.Koordinator, { foreignKey: "koordinatorId" });

db.KatalogLatihan.hasMany(db.OpsiLatihan, {
  foreignKey: "katalogLatihanId",
  as: "opsiLatihan",
});
db.OpsiLatihan.belongsTo(db.KatalogLatihan, {
  foreignKey: "katalogLatihanId",
  as: "katalogLatihan",
});

db.Atlet.hasMany(db.LatihanAtlet, {
  foreignKey: "atletId",
  as: "latihanAtlet",
});

db.KatalogLatihan.hasMany(db.LatihanAtlet, {
  foreignKey: "katalogLatihanId",
  as: "latihanAtlet",
});

db.LatihanAtlet.belongsTo(db.Atlet, {
  foreignKey: "atletId",
  as: "atlet",
});

db.LatihanAtlet.belongsTo(db.KatalogLatihan, {
  foreignKey: "katalogLatihanId",
  as: "katalogLatihan",
});

db.Evaluasi.belongsTo(db.LatihanAtlet, {
  foreignKey: "latihanAtletId",
  as: "latihanAtlet",
});

db.LatihanAtlet.hasMany(db.Evaluasi, {
  foreignKey: "latihanAtletId",
  as: "evaluasi",
});


export default db;
