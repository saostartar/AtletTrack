// controllers/koordinator/analyticsController.js
import db from "../../models/index.js";

export const getAnalitikPerformaAtlet = async (req, res) => {
  try {
    const evaluasi = await db.Evaluasi.findAll({
      include: [
        {
          model: db.Atlet,
          as: "atlet",
          attributes: ["id", "nama", "cabangOlahraga"],
        },
        {
          model: db.LatihanAtlet,
          as: "latihanAtlet",
          include: [
            {
              model: db.KatalogLatihan,
              as: "katalogLatihan",
              attributes: ["nama", "jenisLatihan", "tingkatKesulitan"],
            },
          ],
        },
      ],
      where: { koordinatorId: req.user.id },
      order: [["createdAt", "ASC"]],
    });

    // Transform data for visualization
    const performaData = {};

    evaluasi.forEach((evalItem) => {
      const atletNama = evalItem.atlet.nama;
      if (!performaData[atletNama]) {
        performaData[atletNama] = {
          dataEvaluasi: [],
          ringkasan: {
            jenisLatihan: {},
            tingkatKesulitan: {},
            tren: {
              harian: {
                skor: 0,
                perubahan: 0,
              },
              bulanan: {
                skor: 0,
                perubahan: 0,
              },
              tahunan: {
                skor: 0,
                perubahan: 0,
              },
              totalEvaluasi: 0,
            },
          },
        };
      }

      // Add evaluation data
      performaData[atletNama].dataEvaluasi.push({
        id: evalItem.id,
        skor: evalItem.skor,
        tanggal: evalItem.createdAt,
        jenisLatihan: evalItem.jenisLatihan,
        namaLatihan: evalItem.latihanAtlet?.katalogLatihan?.nama,
        tingkatKesulitan:
          evalItem.latihanAtlet?.katalogLatihan?.tingkatKesulitan,
        targetPencapaian: evalItem.targetPencapaian,
        totalRepetisiTercapai: evalItem.totalRepetisiTercapai,
        totalRepetisiTarget: evalItem.totalRepetisiTarget,
        persentaseKetercapaian: evalItem.persentaseKetercapaian,
        komentar: evalItem.komentar,
      });

      // Update exercise type statistics
      const jenisLatihan = evalItem.jenisLatihan;
      if (!performaData[atletNama].ringkasan.jenisLatihan[jenisLatihan]) {
        performaData[atletNama].ringkasan.jenisLatihan[jenisLatihan] = {
          total: 0,
          rataRataSkor: 0,
          jumlahEvaluasi: 0,
        };
      }
      performaData[atletNama].ringkasan.jenisLatihan[jenisLatihan].total +=
        evalItem.skor;
      performaData[atletNama].ringkasan.jenisLatihan[jenisLatihan]
        .jumlahEvaluasi++;
      performaData[atletNama].ringkasan.jenisLatihan[
        jenisLatihan
      ].rataRataSkor =
        performaData[atletNama].ringkasan.jenisLatihan[jenisLatihan].total /
        performaData[atletNama].ringkasan.jenisLatihan[jenisLatihan]
          .jumlahEvaluasi;

      // Update difficulty level statistics
      const tingkatKesulitan =
        evalItem.latihanAtlet?.katalogLatihan?.tingkatKesulitan;
      if (tingkatKesulitan) {
        if (
          !performaData[atletNama].ringkasan.tingkatKesulitan[tingkatKesulitan]
        ) {
          performaData[atletNama].ringkasan.tingkatKesulitan[tingkatKesulitan] =
            {
              total: 0,
              rataRataSkor: 0,
              jumlahEvaluasi: 0,
            };
        }
        performaData[atletNama].ringkasan.tingkatKesulitan[
          tingkatKesulitan
        ].total += evalItem.skor;
        performaData[atletNama].ringkasan.tingkatKesulitan[tingkatKesulitan]
          .jumlahEvaluasi++;
        performaData[atletNama].ringkasan.tingkatKesulitan[
          tingkatKesulitan
        ].rataRataSkor =
          performaData[atletNama].ringkasan.tingkatKesulitan[tingkatKesulitan]
            .total /
          performaData[atletNama].ringkasan.tingkatKesulitan[tingkatKesulitan]
            .jumlahEvaluasi;
      }
    });

    // Calculate trends and overall statistics
    Object.keys(performaData).forEach((atletNama) => {
      const data = performaData[atletNama].dataEvaluasi;
      const now = new Date();

      // Get date ranges
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);

      const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

      const thisYear = new Date(now.getFullYear(), 0, 1);
      const lastYear = new Date(now.getFullYear() - 1, 0, 1);

      // Get evaluations within each period
      const dailyEvals = data.filter(item => {
        const itemDate = new Date(item.tanggal);
        return itemDate >= today;
      });

      const yesterdayEvals = data.filter(item => {
        const itemDate = new Date(item.tanggal);
        return itemDate >= yesterday && itemDate < today;
      });

      const thisMonthEvals = data.filter(item => {
        const itemDate = new Date(item.tanggal);
        return itemDate >= thisMonth;
      });

      const lastMonthEvals = data.filter(item => {
        const itemDate = new Date(item.tanggal);
        return itemDate >= lastMonth && itemDate < thisMonth;
      });

      const thisYearEvals = data.filter(item => {
        const itemDate = new Date(item.tanggal);
        return itemDate >= thisYear;
      });

      const lastYearEvals = data.filter(item => {
        const itemDate = new Date(item.tanggal);
        return itemDate >= lastYear && itemDate < thisYear;
      });

      // Calculate averages
      const dailyAvg = calculateAverage(dailyEvals);
      const yesterdayAvg = calculateAverage(yesterdayEvals);
      const thisMonthAvg = calculateAverage(thisMonthEvals);
      const lastMonthAvg = calculateAverage(lastMonthEvals);
      const thisYearAvg = calculateAverage(thisYearEvals);
      const lastYearAvg = calculateAverage(lastYearEvals);

      // Calculate progress percentages with new logic
      performaData[atletNama].ringkasan.tren = {
        harian: {
          skor: dailyAvg,
          perubahan: calculateProgress(dailyAvg, yesterdayAvg),
          jumlahEvaluasi: dailyEvals.length
        },
        bulanan: {
          skor: thisMonthAvg,
          perubahan: calculateProgress(thisMonthAvg, lastMonthAvg),
          jumlahEvaluasi: thisMonthEvals.length
        },
        tahunan: {
          skor: thisYearAvg,
          perubahan: calculateProgress(thisYearAvg, lastYearAvg),
          jumlahEvaluasi: thisYearEvals.length
        }
      };
    });

    res.json(performaData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Helper functions
const calculateAverage = (evaluations) => {
  if (!evaluations || evaluations.length === 0) return 0;
  const sum = evaluations.reduce((acc, curr) => acc + curr.skor, 0);
  return Number((sum / evaluations.length).toFixed(1));
};

const calculateProgress = (currentAvg, previousAvg) => {
  // If we have current average but no previous average, it means it's a new achievement
  if (currentAvg > 0 && (!previousAvg || previousAvg === 0)) {
    return currentAvg.toFixed(1);
  }
  
  // If we have both averages, calculate the percentage change
  if (currentAvg > 0 && previousAvg > 0) {
    const change = ((currentAvg - previousAvg) / previousAvg) * 100;
    return change.toFixed(1);
  }

  // If no valid comparison can be made
  return '0.0';
};