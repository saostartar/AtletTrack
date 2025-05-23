// models/LatihanAtlet.js
export default (sequelize, DataTypes) => {
  const LatihanAtlet = sequelize.define("LatihanAtlet", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    atletId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Atlets",
        key: "id",
      },
    },
    katalogLatihanId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "KatalogLatihans",
        key: "id",
      },
    },
    status: {
      type: DataTypes.ENUM("ONGOING", "COMPLETED"),
      defaultValue: "ONGOING",
    },
    tanggalMulai: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    tanggalSelesai: {
      type: DataTypes.DATE,
    },
    currentOpsiIndex: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    progressLatihan: {
      type: DataTypes.TEXT,
      get() {
        try {
          const rawValue = this.getDataValue("progressLatihan");
          return rawValue ? JSON.parse(rawValue) : [];
        } catch (error) {
          return [];
        }
      },
      set(value) {
        try {
          this.setDataValue(
            "progressLatihan",
            typeof value === "string" ? value : JSON.stringify(value)
          );
        } catch (error) {
          this.setDataValue("progressLatihan", "[]");
        }
      },
      comment: "Menyimpan progress repetisi untuk setiap opsi latihan",
    },
    totalRepetisiTercapai: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      comment: "Total repetisi yang berhasil diselesaikan",
    },
    totalRepetisiTarget: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      comment: "Total target repetisi dari semua opsi",
    },
  });

  return LatihanAtlet;
};
