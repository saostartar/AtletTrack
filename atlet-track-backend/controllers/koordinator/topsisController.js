// controllers/koordinator/topsisController.js
import db from "../../models/index.js";
import { Op } from "sequelize";

// Import the exercise types from katalogLatihanController.js
// If direct import isn't possible, we can reproduce the object here
const JENIS_LATIHAN = {
  KETAHANAN: {
    targetMinimal: 70,
    deskripsiTarget: "Target untuk latihan ketahanan adalah konsistensi dalam durasi dan intensitas"
  },
  KEKUATAN: {
    targetMinimal: 65,
    deskripsiTarget: "Target untuk latihan kekuatan adalah pencapaian beban dan repetisi yang ditentukan"
  },
  KECEPATAN: {
    targetMinimal: 75,
    deskripsiTarget: "Target untuk latihan kecepatan adalah waktu eksekusi dan konsistensi gerakan"
  },
  KELINCAHAN: {
    targetMinimal: 70,
    deskripsiTarget: "Target untuk latihan kelincahan adalah kemampuan mengubah arah dengan cepat dan tepat"
  },
  KOORDINASI: {
    targetMinimal: 75,
    deskripsiTarget: "Target untuk latihan koordinasi adalah ketepatan dan keselarasan gerakan"
  }
};

// Calculate criterion weights based on target minimal values
const calculateWeightsFromTargets = () => {
  // Extract target minimal values
  const targetValues = {};
  let totalTargetValue = 0;
  
  for (const [type, data] of Object.entries(JENIS_LATIHAN)) {
    targetValues[type] = data.targetMinimal;
    totalTargetValue += data.targetMinimal;
  }
  
  // Calculate normalized weights
  const weights = {};
  for (const [type, value] of Object.entries(targetValues)) {
    // Round to 2 decimal places to ensure readability
    weights[type] = parseFloat((value / totalTargetValue).toFixed(2));
  }
  
  return weights;
};

// Calculate criterion weights dynamically from target minimal values
const CRITERION_WEIGHTS = calculateWeightsFromTargets();

/**
 * TOPSIS Method Implementation
 * 
 * TOPSIS (Technique for Order of Preference by Similarity to Ideal Solution)
 * uses the following steps:
 * 1. Normalize the decision matrix
 * 2. Calculate the weighted normalized decision matrix
 * 3. Determine the ideal and negative-ideal solutions
 * 4. Calculate the separation measures
 * 5. Calculate the relative closeness to the ideal solution
 * 6. Rank the preference order
 */

// Calculate the Euclidean distance between two points
const calculateDistance = (point1, point2) => {
  let sum = 0;
  for (let i = 0; i < point1.length; i++) {
    sum += Math.pow(point1[i] - point2[i], 2);
  }
  return Math.sqrt(sum);
};

// Normalize a matrix using vector normalization
const normalizeMatrix = (matrix) => {
  const normalizedMatrix = [];
  const columnCount = matrix[0].length;
  
  // Calculate the square root of the sum of squares for each column
  const columnNorms = Array(columnCount).fill(0);
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < columnCount; j++) {
      columnNorms[j] += Math.pow(matrix[i][j], 2);
    }
  }
  
  for (let j = 0; j < columnCount; j++) {
    columnNorms[j] = Math.sqrt(columnNorms[j]);
  }
  
  // Normalize each value
  for (let i = 0; i < matrix.length; i++) {
    normalizedMatrix[i] = [];
    for (let j = 0; j < columnCount; j++) {
      // Handle division by zero
      if (columnNorms[j] === 0) {
        normalizedMatrix[i][j] = 0;
      } else {
        normalizedMatrix[i][j] = matrix[i][j] / columnNorms[j];
      }
    }
  }
  
  return normalizedMatrix;
};

// Get the best athletes using TOPSIS method
export const getBestAthletes = async (req, res) => {
  try {
    const { cabangOlahraga, limit = 10, startDate, endDate } = req.query;
    
    // Build the date filter
    const dateFilter = {};
    if (startDate && endDate) {
      dateFilter.createdAt = {
        [Op.between]: [new Date(startDate), new Date(endDate)]
      };
    } else if (startDate) {
      dateFilter.createdAt = {
        [Op.gte]: new Date(startDate)
      };
    } else if (endDate) {
      dateFilter.createdAt = {
        [Op.lte]: new Date(endDate)
      };
    }
    
    // First, get all athletes under the coordinator's supervision
    const whereClause = {
      koordinatorId: req.user.id // Filter by coordinator ID
    };
    
    if (cabangOlahraga) {
      whereClause.cabangOlahraga = cabangOlahraga;
    }
    
    const athletes = await db.Atlet.findAll({
      where: whereClause,
      attributes: ['id', 'nama', 'cabangOlahraga'],
      include: [
        {
          model: db.Evaluasi,
          as: 'evaluasi',
          where: dateFilter,
          required: false
        }
      ]
    });
    
    // Filter out athletes with no evaluations
    const athletesWithEvals = athletes.filter(athlete => 
      athlete.evaluasi && athlete.evaluasi.length > 0
    );
    
    if (athletesWithEvals.length === 0) {
      return res.status(404).json({
        message: "Tidak ada Data"
      });
    }
    
    // Group evaluations by athlete and exercise type, then calculate average scores
    const athleteScores = [];
    const criteriaTypes = Object.keys(CRITERION_WEIGHTS);
    
    for (const athlete of athletesWithEvals) {
      const scores = {};
      let hasAllCriteria = true;
      
      // Initialize scores for each criterion
      criteriaTypes.forEach(type => {
        const evaluationsForType = athlete.evaluasi.filter(
          e => e.jenisLatihan === type
        );
        
        if (evaluationsForType.length > 0) {
          // Calculate average score for this type
          const totalScore = evaluationsForType.reduce(
            (sum, evaluation) => sum + parseFloat(evaluation.skor), 0
          );
          scores[type] = totalScore / evaluationsForType.length;
        } else {
          hasAllCriteria = false;
          scores[type] = 0; // Default score if no evaluations exist
        }
      });
      
      athleteScores.push({
        id: athlete.id,
        nama: athlete.nama,
        cabangOlahraga: athlete.cabangOlahraga,
        scores: scores,
        hasAllCriteria: hasAllCriteria
      });
    }
    
    // Create decision matrix
    const decisionMatrix = athleteScores.map(athlete => {
      return criteriaTypes.map(type => athlete.scores[type]);
    });
    
    // Apply TOPSIS method
    // Step 1: Normalize the decision matrix
    const normalizedMatrix = normalizeMatrix(decisionMatrix);
    
    // Step 2: Calculate the weighted normalized decision matrix
    const weightedMatrix = normalizedMatrix.map(row => {
      return row.map((value, index) => 
        value * CRITERION_WEIGHTS[criteriaTypes[index]]
      );
    });
    
    // Step 3: Determine the ideal and negative-ideal solutions
    const idealSolution = Array(criteriaTypes.length).fill(0);
    const negativeIdealSolution = Array(criteriaTypes.length).fill(0);
    
    for (let j = 0; j < criteriaTypes.length; j++) {
      let max = -Infinity;
      let min = Infinity;
      
      for (let i = 0; i < weightedMatrix.length; i++) {
        if (weightedMatrix[i][j] > max) {
          max = weightedMatrix[i][j];
        }
        if (weightedMatrix[i][j] < min) {
          min = weightedMatrix[i][j];
        }
      }
      
      idealSolution[j] = max;
      negativeIdealSolution[j] = min;
    }
    
    // Step 4: Calculate the separation measures
    const separationFromIdeal = [];
    const separationFromNegativeIdeal = [];
    
    for (let i = 0; i < weightedMatrix.length; i++) {
      separationFromIdeal.push(
        calculateDistance(weightedMatrix[i], idealSolution)
      );
      separationFromNegativeIdeal.push(
        calculateDistance(weightedMatrix[i], negativeIdealSolution)
      );
    }
    
    // Step 5: Calculate the relative closeness to the ideal solution
    const relativeCloseness = [];
    
    for (let i = 0; i < weightedMatrix.length; i++) {
      // Handle division by zero
      const denominator = separationFromIdeal[i] + separationFromNegativeIdeal[i];
      if (denominator === 0) {
        relativeCloseness.push(0);
      } else {
        relativeCloseness.push(
          separationFromNegativeIdeal[i] / denominator
        );
      }
    }
    
    // Step 6: Rank the preference order
    const topsisResults = athleteScores.map((athlete, index) => {
      return {
        ...athlete,
        topsisScore: relativeCloseness[index],
        rank: null // Will be assigned next
      };
    });
    
    // Sort by TOPSIS score (descending)
    topsisResults.sort((a, b) => b.topsisScore - a.topsisScore);
    
    // Assign ranks
    topsisResults.forEach((result, index) => {
      result.rank = index + 1;
    });
    
    // Return the top N athletes based on the limit parameter
    const topAthletes = topsisResults.slice(0, parseInt(limit));
    
    // Additional metadata for transparency
    const metadata = {
      criteriaWeights: CRITERION_WEIGHTS,
      criteriaWeightSource: "Dihitung dari nilai target minimal setiap jenis latihan",
      totalAthletes: topsisResults.length,
      dateRange: {
        startDate: startDate || "All time",
        endDate: endDate || "Current date"
      },
      cabangOlahraga: cabangOlahraga || "All sports"
    };
    
    res.json({
      metadata,
      results: topAthletes
    });
    
  } catch (error) {
    console.error("TOPSIS calculation error:", error);
    res.status(500).json({ 
      message: "Error calculating best athletes",
      error: error.message 
    });
  }
};

// Get detailed TOPSIS analysis for a specific athlete
export const getAthleteAnalysis = async (req, res) => {
  try {
    const { id } = req.params;
    
    const athlete = await db.Atlet.findOne({
      where: { 
        id: id,
        koordinatorId: req.user.id // Filter by coordinator ID
      },
      include: [
        {
          model: db.Evaluasi,
          as: 'evaluasi'
        }
      ]
    });
    
    if (!athlete) {
      return res.status(404).json({ message: "Athlete not found or not under your supervision" });
    }
    
    // Group evaluations by exercise type
    const criteriaTypes = Object.keys(CRITERION_WEIGHTS);
    const evaluationsByType = {};
    
    criteriaTypes.forEach(type => {
      const evaluationsForType = athlete.evaluasi.filter(
        e => e.jenisLatihan === type
      );
      
      if (evaluationsForType.length > 0) {
        const totalScore = evaluationsForType.reduce(
          (sum, evaluation) => sum + parseFloat(evaluation.skor), 0
        );
        const averageScore = totalScore / evaluationsForType.length;
        
        evaluationsByType[type] = {
          count: evaluationsForType.length,
          averageScore: averageScore,
          latestScore: evaluationsForType.sort((a, b) => 
            new Date(b.createdAt) - new Date(a.createdAt)
          )[0].skor,
          weight: CRITERION_WEIGHTS[type],
          targetMinimal: JENIS_LATIHAN[type].targetMinimal,
          weightedScore: averageScore * CRITERION_WEIGHTS[type],
          evaluations: evaluationsForType.map(evaluation => ({
            id: evaluation.id,
            skor: evaluation.skor,
            tanggal: evaluation.createdAt,
            komentar: evaluation.komentar
          }))
        };
      } else {
        evaluationsByType[type] = {
          count: 0,
          averageScore: 0,
          latestScore: 0,
          weight: CRITERION_WEIGHTS[type],
          targetMinimal: JENIS_LATIHAN[type].targetMinimal,
          weightedScore: 0,
          evaluations: []
        };
      }
    });
    
    // Calculate overall weighted score
    const overallScore = Object.values(evaluationsByType).reduce(
      (sum, type) => sum + type.weightedScore, 0
    );
    
    // Get strengths and weaknesses
    const strengths = [];
    const weaknesses = [];
    
    Object.entries(evaluationsByType).forEach(([type, data]) => {
      if (data.count > 0) {
        if (data.averageScore >= 75) {
          strengths.push({
            type: type,
            score: data.averageScore,
            weight: data.weight,
            targetMinimal: data.targetMinimal
          });
        } else if (data.averageScore < 60) {
          weaknesses.push({
            type: type,
            score: data.averageScore,
            weight: data.weight,
            targetMinimal: data.targetMinimal
          });
        }
      }
    });
    
    // Sort strengths and weaknesses
    strengths.sort((a, b) => b.score - a.score);
    weaknesses.sort((a, b) => a.score - b.score);
    
    res.json({
      id: athlete.id,
      nama: athlete.nama,
      cabangOlahraga: athlete.cabangOlahraga,
      evaluationsByType: evaluationsByType,
      overallWeightedScore: overallScore,
      strengths: strengths,
      weaknesses: weaknesses,
      weightSource: "Bobot kriteria dihitung berdasarkan nilai target minimal setiap jenis latihan",
      recommendations: weaknesses.map(w => ({
      type: w.type,
      recommendation: `Fokus untuk meningkatkan ${w.type.toLowerCase()} dengan program latihan yang terfokus karena saat ini menjadi area yang lemah.`
      }))
    });
    
  } catch (error) {
    console.error("Athlete analysis error:", error);
    res.status(500).json({ 
      message: "Error analyzing athlete performance",
      error: error.message 
    });
  }
};

// Add this new export to the existing topsisController.js file

export const getTopsisCalculationSteps = async (req, res) => {
  try {
    const { cabangOlahraga, startDate, endDate } = req.query;
    
    // Build the date filter
    const dateFilter = {};
    if (startDate && endDate) {
      dateFilter.createdAt = {
        [Op.between]: [new Date(startDate), new Date(endDate)]
      };
    } else if (startDate) {
      dateFilter.createdAt = {
        [Op.gte]: new Date(startDate)
      };
    } else if (endDate) {
      dateFilter.createdAt = {
        [Op.lte]: new Date(endDate)
      };
    }
    
    // Get athletes with evaluations
    const whereClause = {
      koordinatorId: req.user.id
    };
    
    if (cabangOlahraga) {
      whereClause.cabangOlahraga = cabangOlahraga;
    }
    
    const athletes = await db.Atlet.findAll({
      where: whereClause,
      attributes: ['id', 'nama', 'cabangOlahraga'],
      include: [
        {
          model: db.Evaluasi,
          as: 'evaluasi',
          where: dateFilter,
          required: false
        }
      ]
    });
    
    const athletesWithEvals = athletes.filter(athlete => 
      athlete.evaluasi && athlete.evaluasi.length > 0
    );
    
    if (athletesWithEvals.length === 0) {
      return res.status(404).json({
        message: "Tidak ada data evaluasi yang tersedia untuk perhitungan"
      });
    }
    
    // Prepare data for TOPSIS calculation
    const criteriaTypes = Object.keys(CRITERION_WEIGHTS);
    const athleteScores = [];
    
    for (const athlete of athletesWithEvals) {
      const scores = {};
      
      criteriaTypes.forEach(type => {
        const evaluationsForType = athlete.evaluasi.filter(
          e => e.jenisLatihan === type
        );
        
        if (evaluationsForType.length > 0) {
          const totalScore = evaluationsForType.reduce(
            (sum, evaluation) => sum + parseFloat(evaluation.skor), 0
          );
          scores[type] = totalScore / evaluationsForType.length;
        } else {
          scores[type] = 0;
        }
      });
      
      athleteScores.push({
        id: athlete.id,
        nama: athlete.nama,
        cabangOlahraga: athlete.cabangOlahraga,
        scores: scores
      });
    }
    
    // Step 1: Decision Matrix
    const decisionMatrix = athleteScores.map(athlete => {
      return criteriaTypes.map(type => athlete.scores[type]);
    });
    
    // Step 2: Calculate column norms for normalization
    const columnNorms = {};
    criteriaTypes.forEach((type, index) => {
      let sumOfSquares = 0;
      decisionMatrix.forEach(row => {
        sumOfSquares += Math.pow(row[index], 2);
      });
      columnNorms[type] = Math.sqrt(sumOfSquares);
    });
    
    // Step 3: Normalize the decision matrix
    const normalizationResults = athleteScores.map((athlete, athleteIndex) => {
      const normalizedScores = {};
      criteriaTypes.forEach((type, criteriaIndex) => {
        if (columnNorms[type] === 0) {
          normalizedScores[type] = 0;
        } else {
          normalizedScores[type] = athlete.scores[type] / columnNorms[type];
        }
      });
      
      return {
        nama: athlete.nama,
        normalizedScores: normalizedScores
      };
    });
    
    // Step 4: Calculate weighted normalized matrix
    const weightedResults = normalizationResults.map(result => {
      const weightedScores = {};
      criteriaTypes.forEach(type => {
        weightedScores[type] = result.normalizedScores[type] * CRITERION_WEIGHTS[type];
      });
      
      return {
        nama: result.nama,
        weightedScores: weightedScores
      };
    });
    
    // Step 5: Determine ideal solutions
    const idealSolutions = {
      positive: {},
      negative: {}
    };
    
    criteriaTypes.forEach(type => {
      let max = -Infinity;
      let min = Infinity;
      
      weightedResults.forEach(result => {
        if (result.weightedScores[type] > max) {
          max = result.weightedScores[type];
        }
        if (result.weightedScores[type] < min) {
          min = result.weightedScores[type];
        }
      });
      
      idealSolutions.positive[type] = max === -Infinity ? 0 : max;
      idealSolutions.negative[type] = min === Infinity ? 0 : min;
    });
    
    // Step 6: Calculate distances to ideal solutions
    const distances = athleteScores.map((athlete, index) => {
      let positiveSum = 0;
      let negativeSum = 0;
      
      criteriaTypes.forEach(type => {
        const weightedScore = weightedResults[index].weightedScores[type];
        positiveSum += Math.pow(weightedScore - idealSolutions.positive[type], 2);
        negativeSum += Math.pow(weightedScore - idealSolutions.negative[type], 2);
      });
      
      return {
        nama: athlete.nama,
        positiveDistance: Math.sqrt(positiveSum),
        negativeDistance: Math.sqrt(negativeSum)
      };
    });
    
    // Step 7: Calculate relative closeness
    const relativeCloseness = distances.map(distance => {
      const denominator = distance.positiveDistance + distance.negativeDistance;
      const score = denominator === 0 ? 0 : distance.negativeDistance / denominator;
      
      return {
        nama: distance.nama,
        score: score
      };
    });
    
    // Step 8: Final rankings
    const finalRankings = athleteScores.map((athlete, index) => ({
      nama: athlete.nama,
      id: athlete.id,
      topsisScore: relativeCloseness[index].score,
      rank: null
    }));
    
    finalRankings.sort((a, b) => b.topsisScore - a.topsisScore);
    finalRankings.forEach((result, index) => {
      result.rank = index + 1;
    });
    
    // Prepare response with all calculation steps
    const response = {
      jenisLatihan: JENIS_LATIHAN,
      weights: CRITERION_WEIGHTS,
      criterias: criteriaTypes.map(c => c.toLowerCase()),
      athleteData: athleteScores,
      columnNorms: columnNorms,
      normalizationResults: normalizationResults,
      weightedResults: weightedResults,
      idealSolutions: idealSolutions,
      distances: distances,
      relativeCloseness: relativeCloseness,
      finalRankings: finalRankings,
      metadata: {
        totalAthletes: athleteScores.length,
        criteriaCount: criteriaTypes.length,
        calculationDate: new Date().toISOString(),
        filters: {
          cabangOlahraga: cabangOlahraga || "Semua",
          startDate: startDate || "Semua waktu",
          endDate: endDate || "Hingga sekarang"
        }
      }
    };
    
    res.json(response);
    
  } catch (error) {
    console.error("TOPSIS calculation steps error:", error);
    res.status(500).json({ 
      message: "Error generating TOPSIS calculation steps",
      error: error.message 
    });
  }
};