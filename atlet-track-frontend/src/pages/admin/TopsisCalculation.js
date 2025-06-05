import React from 'react'; // Impor React
// Row dan Col dihapus karena tidak digunakan dalam layout saat ini
import { Container, Card, Table, Badge, Alert } from 'react-bootstrap';

/**
 * Komponen TopsisCalculation
 *
 * Komponen ini mendemonstrasikan perhitungan TOPSIS (Technique for Order Preference
 * by Similarity to Ideal Solution) langkah demi langkah. Komponen ini ditujukan untuk
 * keperluan administratif guna memverifikasi dan memahami proses kalkulasi.
 * Perhitungan dilakukan di sisi klien menggunakan dataset sampel.
 */
const TopsisCalculation = () => {
  // Data evaluasi atlet (Data Sampel dari PDF)
  // Data ini merepresentasikan skor performa mentah atlet untuk berbagai kriteria.
  // Dalam aplikasi nyata, data ini kemungkinan akan berasal dari database atau API.
  const athleteData = [
    { name: 'Haezargreaves Shaq Bigael Joaquin Tumuwo', ketahanan: 71.0, kekuatan: 100.0, kecepatan: 88.0, kelincahan: 63.0, koordinasi: 75.0 },
    { name: 'Toraya A. Pontuluran', ketahanan: 71.0, kekuatan: 82.0, kecepatan: 75.0, kelincahan: 75.0, koordinasi: 75.0 },
    { name: 'Fernando Fransco Manangsang', ketahanan: 71.0, kekuatan: 60.0, kecepatan: 50.0, kelincahan: 63.0, koordinasi: 80.0 },
    { name: 'Karl Patrick Utiarahman Gloria', ketahanan: 43.0, kekuatan: 64.0, kecepatan: 63.0, kelincahan: 63.0, koordinasi: 63.0 },
    { name: 'Christ Ellia Yohannes Sembel', ketahanan: 71.0, kekuatan: 45.0, kecepatan: 63.0, kelincahan: 50.0, koordinasi: 63.0 },
    { name: 'Christian Timothy Edbert Tuwaidan', ketahanan: 57.0, kekuatan: 68.7, kecepatan: 75.0, kelincahan: 50.0, koordinasi: 38.0 },
    { name: 'Sergyo Stevanus Antonio Susilo Mangundap', ketahanan: 57.0, kekuatan: 55.0, kecepatan: 50.0, kelincahan: 50.0, koordinasi: 100.0 },
    { name: 'Jason Edward Tjioe Sidabutar', ketahanan: 43.0, kekuatan: 27.0, kecepatan: 38.0, kelincahan: 63.0, koordinasi: 50.0 },
    { name: 'Claudio Yeheskiel Johanis Rarumengkey', ketahanan: 57.0, kekuatan: 45.0, kecepatan: 50.0, kelincahan: 38.0, koordinasi: 44.0 },
    { name: 'Reinhard Oktonuel Titing', ketahanan: 29.0, kekuatan: 18.0, kecepatan: 25.0, kelincahan: 25.0, koordinasi: 25.0 },
    { name: 'Christyanto Imanuel Machmoed', ketahanan: 29.0, kekuatan: 18.0, kecepatan: 25.0, kelincahan: 25.0, koordinasi: 25.0 },
  ];

  // Definisi jenis latihan dan target minimal (Sumber Definisi Kriteria dan Bobot)
  // Definisi ini digunakan untuk menghitung bobot untuk setiap kriteria.
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

  // Array kunci kriteria (huruf kecil agar sesuai dengan kunci di athleteData)
  const criterias = Object.keys(JENIS_LATIHAN).map(key => key.toLowerCase());

  // Langkah 2: Hitung bobot kriteria berdasarkan target minimal
  // Bobot dihitung berdasarkan 'targetMinimal' untuk setiap jenis latihan.
  // Bobot untuk sebuah kriteria adalah targetMinimal-nya dibagi dengan jumlah semua targetMinimal.
  const calculateWeights = () => {
    const targetValues = {};
    let totalTargetValue = 0;

    for (const [type, data] of Object.entries(JENIS_LATIHAN)) {
      targetValues[type.toLowerCase()] = data.targetMinimal;
      totalTargetValue += data.targetMinimal;
    }

    const weights = {};
    if (totalTargetValue === 0) { // Hindari pembagian dengan nol jika semua target adalah 0
        for (const type of Object.keys(targetValues)) {
            weights[type] = 0;
        }
    } else {
        for (const [type, value] of Object.entries(targetValues)) {
          // Bobot biasanya dinormalisasi agar berjumlah 1, tetapi di sini didasarkan pada proporsi.
          // Backend menggunakan toFixed(2) untuk bobot.
          weights[type] = parseFloat((value / totalTargetValue).toFixed(2));
        }
    }
    return weights;
  };

  const weights = calculateWeights();

  // Langkah 3.1: Hitung akar kuadrat dari jumlah kuadrat setiap kolom (Penyebut Normalisasi)
  // Ini adalah bagian penyebut dari formula normalisasi vektor untuk setiap kriteria.
  // sqrt(sum(x_ij^2 untuk semua atlet i, untuk kriteria j tertentu))
  const calculateColumnNorms = () => {
    const norms = {};
    criterias.forEach(criteria => {
      let sumOfSquares = 0;
      athleteData.forEach(athlete => {
        sumOfSquares += Math.pow(athlete[criteria] || 0, 2); // Gunakan 0 jika kriteria tidak ada untuk seorang atlet
      });
      norms[criteria] = Math.sqrt(sumOfSquares);
    });
    return norms;
  };

  const columnNorms = calculateColumnNorms();

  // Langkah 3.2: Hasil perhitungan normalisasi matriks keputusan
  // Setiap sel x_ij dinormalisasi dengan membaginya dengan norma kolom yang dihitung di atas.
  // r_ij = x_ij / sqrt(sum(x_ik^2 untuk semua k))
  const calculateNormalization = () => {
    return athleteData.map(athlete => {
      const normalized = { name: athlete.name };
      criterias.forEach(criteria => {
        if (columnNorms[criteria] === 0) {
          normalized[criteria] = 0; // Hindari pembagian dengan nol
        } else {
          normalized[criteria] = (athlete[criteria] || 0) / columnNorms[criteria];
        }
      });
      return normalized;
    });
  };

  const normalizationResults = calculateNormalization();

  // Langkah 4: Hasil perhitungan normalisasi terbobot
  // Setiap skor ternormalisasi r_ij dikalikan dengan bobot kriteria w_j yang sesuai.
  // v_ij = r_ij * w_j
  const calculateWeightedNormalization = () => {
    return normalizationResults.map(result => {
      const weighted = { name: result.name };
      criterias.forEach(criteria => {
        weighted[criteria] = result[criteria] * weights[criteria];
      });
      return weighted;
    });
  };

  const weightedResults = calculateWeightedNormalization();

  // Langkah 5: Tentukan Solusi Ideal Positif (A+) dan Negatif (A-)
  // Solusi Ideal Positif (A+): Berisi skor ternormalisasi terbobot maksimum untuk setiap kriteria.
  // Solusi Ideal Negatif (A-): Berisi skor ternormalisasi terbobot minimum untuk setiap kriteria.
  const calculateIdealSolutions = () => {
    const positiveIdeal = {};
    const negativeIdeal = {};

    criterias.forEach(criteria => {
      let maxVal = -Infinity;
      let minVal = Infinity;

      weightedResults.forEach(result => {
        if (result[criteria] > maxVal) maxVal = result[criteria];
        if (result[criteria] < minVal) minVal = result[criteria];
      });

      // Jika semua nilai untuk sebuah kriteria dalam weightedResults adalah 0 (misalnya, skor asli adalah 0 atau bobot adalah 0)
      // maka maxVal bisa tetap -Infinity dan minVal Infinity. Atur ke 0 dalam kasus seperti itu.
      positiveIdeal[criteria] = (maxVal === -Infinity) ? 0 : maxVal;
      negativeIdeal[criteria] = (minVal === Infinity) ? 0 : minVal;
    });
    return { positiveIdeal, negativeIdeal };
  };

  const { positiveIdeal, negativeIdeal } = calculateIdealSolutions();

  // Langkah 6: Hitung jarak ke solusi ideal positif (D+) dan negatif (D-)
  // Jarak Euclidean digunakan untuk mengukur pemisahan setiap alternatif
  // dari solusi ideal positif (D_i+) dan solusi ideal negatif (D_i-).
  const calculateDistances = () => {
    const positiveDistances = {};
    const negativeDistances = {};

    weightedResults.forEach(result => {
      let positiveSumSq = 0;
      let negativeSumSq = 0;

      criterias.forEach(criteria => {
        positiveSumSq += Math.pow(result[criteria] - positiveIdeal[criteria], 2);
        negativeSumSq += Math.pow(result[criteria] - negativeIdeal[criteria], 2);
      });

      positiveDistances[result.name] = Math.sqrt(positiveSumSq);
      negativeDistances[result.name] = Math.sqrt(negativeSumSq);
    });
    return { positiveDistances, negativeDistances };
  };

  const { positiveDistances, negativeDistances } = calculateDistances();

  // Langkah 7: Hitung kedekatan relatif terhadap solusi ideal (C_i)
  // Nilai ini menunjukkan seberapa dekat sebuah alternatif dengan solusi ideal.
  // C_i = D_i- / (D_i+ + D_i-)
  const calculateRelativeCloseness = () => {
    const closeness = {};
    Object.keys(positiveDistances).forEach(name => {
      const denominator = positiveDistances[name] + negativeDistances[name];
      if (denominator === 0) {
        closeness[name] = 0; // Hindari pembagian dengan nol; menyiratkan D+ dan D- keduanya 0
      } else {
        closeness[name] = negativeDistances[name] / denominator;
      }
    });
    return closeness;
  };

  const relativeCloseness = calculateRelativeCloseness();

  // Langkah 8: Peringkat akhir atlet
  // Atlet diperingkat berdasarkan skor kedekatan relatif mereka (C_i). Semakin tinggi semakin baik.
  const calculateRankings = () => {
    const ranks = Object.entries(relativeCloseness).map(([name, score]) => ({
      name,
      score: parseFloat(score.toFixed(3)) // Menggunakan toFixed(3) untuk presisi skor akhir agar sesuai PDF
    }));

    ranks.sort((a, b) => b.score - a.score); // Urutkan menurun berdasarkan skor

    return ranks.map((item, index) => ({
      rank: index + 1,
      name: item.name,
      score: item.score,
      // Penentuan status berdasarkan ambang batas skor
      status: item.score > 0.75 ? 'Istimewa' :
        item.score > 0.5 ? 'Baik' :
          item.score > 0.25 ? 'Cukup' : 'Kurang'
    }));
  };

  const rankings = calculateRankings();

  // Fungsi bantuan untuk memanggil toFixed dengan aman
  const safeToFixed = (num, digits) => {
    const number = parseFloat(num);
    if (isNaN(number)) {
      return 'N/A'; // Atau '0' atau placeholder lain
    }
    return number.toFixed(digits);
  };


  return (
    <Container className="mt-4 mb-5">
      <Alert variant="info" className="mb-4">
        <i className="bi bi-info-circle-fill me-2"></i>
        Halaman ini menampilkan demonstrasi perhitungan TOPSIS langkah demi langkah untuk tujuan verifikasi oleh administrator.
      </Alert>

      <h1 className="mb-4 text-center">Perhitungan Manual TOPSIS (Verifikasi Admin)</h1>

      <Card className="mb-4">
        <Card.Body>
          <Card.Title>Tentang Metode TOPSIS</Card.Title>
          <p>
            TOPSIS (Technique for Order Preference by Similarity to Ideal Solution) adalah metode pengambilan keputusan
            multi-kriteria yang digunakan untuk meranking alternatif berdasarkan jarak dari solusi ideal positif dan negatif.
            Metode ini menghasilkan solusi yang memiliki jarak terpendek dari solusi ideal positif dan jarak terjauh
            dari solusi ideal negatif.
          </p>
          <h6 className="mt-3">Langkah-langkah dalam metode TOPSIS:</h6>
          <ol>
            <li>Menentukan Data Evaluasi Atlet (Matriks Keputusan Awal)</li>
            <li>Menghitung Bobot Kriteria (W)</li>
            <li>Normalisasi Matriks Keputusan (R)</li>
            <li>Menghitung Matriks Keputusan Ternormalisasi Berbobot (V)</li>
            <li>Menentukan Solusi Ideal Positif (A+) dan Negatif (A-)</li>
            <li>Menghitung Jarak Setiap Alternatif dari Solusi Ideal (D+ dan D-)</li>
            <li>Menghitung Kedekatan Relatif terhadap Solusi Ideal (C)</li>
            <li>Menentukan Peringkat Alternatif</li>
          </ol>
        </Card.Body>
      </Card>

      {/* Langkah 1: Data Evaluasi Atlet */}
      <Card className="mb-4">
        <Card.Header className="bg-primary text-white">
          <h5 className="mb-0">Langkah 1: Data Evaluasi Atlet (Matriks Keputusan Awal)</h5>
        </Card.Header>
        <Card.Body>
          <Table striped bordered hover responsive>
            <thead className="table-light">
              <tr>
                <th>Atlet</th>
                {criterias.map(c => <th key={c}>{c.toUpperCase()}</th>)}
              </tr>
            </thead>
            <tbody>
              {athleteData.map((athlete, index) => (
                <tr key={index}>
                  <td>{athlete.name}</td>
                  {criterias.map(c => <td key={c}>{athlete[c] || 0}</td>)}
                </tr>
              ))}
            </tbody>
          </Table>
          <Alert variant="light" className="mb-0 mt-3">
            <p className="mb-0"><small>
              <i className="bi bi-info-circle me-1"></i>
              Data di atas merupakan skor rata-rata evaluasi atlet untuk setiap jenis latihan (data sampel dari PDF).
              Nilai 0 menunjukkan tidak ada evaluasi atau skor nol untuk jenis latihan tersebut.
            </small></p>
          </Alert>
        </Card.Body>
      </Card>

      {/* Langkah 2: Bobot Kriteria */}
      <Card className="mb-4">
        <Card.Header className="bg-primary text-white">
          <h5 className="mb-0">Langkah 2: Bobot Kriteria (W)</h5>
        </Card.Header>
        <Card.Body>
          <Alert variant="secondary" className="mb-3">
            <p className="mb-0">
              <strong>Metode Penentuan Bobot:</strong> Bobot setiap kriteria dihitung berdasarkan nilai target minimal untuk setiap jenis latihan.
              <br />
              <code>Bobot (w<sub>j</sub>) = Target<sub>j</sub> / &Sigma;Target<sub>k</sub></code>
            </p>
          </Alert>
          <Table striped bordered hover responsive>
            <thead className="table-light">
              <tr>
                <th>Kriteria</th>
                <th>Target Minimal</th>
                <th>Bobot (w<sub>j</sub>)</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(JENIS_LATIHAN).map(([type, data], index) => (
                <tr key={index}>
                  <td>{type}</td>
                  <td>{data.targetMinimal}</td>
                  <td>{safeToFixed(weights[type.toLowerCase()], 2)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Langkah 3: Normalisasi Matriks Keputusan */}
      <Card className="mb-4">
        <Card.Header className="bg-primary text-white">
          <h5 className="mb-0">Langkah 3: Normalisasi Matriks Keputusan (R)</h5>
        </Card.Header>
        <Card.Body>
          <Alert variant="secondary">
            <strong>Rumus Normalisasi (Vector Normalization):</strong>
            <div className="text-center my-2">
              <code>r<sub>ij</sub> = x<sub>ij</sub> / &radic;(&Sigma;x<sub>ik</sub><sup>2</sup>)</code> (penjumlahan atas semua atlet k untuk kriteria j)
            </div>
            <p className="mb-0">Dimana r<sub>ij</sub> adalah nilai ternormalisasi, dan x<sub>ij</sub> adalah nilai asli.</p>
          </Alert>

          <h6 className="mt-4">3a. Pembagi Normalisasi (&radic;(&Sigma;x<sub>ik</sub><sup>2</sup>)):</h6>
          <Table striped bordered hover responsive size="sm" className="mt-2">
            <thead className="table-light">
              <tr>
                {criterias.map(c => <th key={c}>{c.toUpperCase()}</th>)}
              </tr>
            </thead>
            <tbody>
              <tr>
                {criterias.map(c => <td key={c}>{safeToFixed(columnNorms[c], 4)}</td>)}
              </tr>
            </tbody>
          </Table>

          <h6 className="mt-4">3b. Matriks Ternormalisasi (R):</h6>
          <Table striped bordered hover responsive className="mt-2">
            <thead className="table-light">
              <tr>
                <th>Atlet</th>
                {criterias.map(c => <th key={c}>{c.toUpperCase()}</th>)}
              </tr>
            </thead>
            <tbody>
              {normalizationResults.map((result, index) => (
                <tr key={index}>
                  <td>{result.name}</td>
                  {criterias.map(c => <td key={c}>{safeToFixed(result[c], 6)}</td>)}
                </tr>
              ))}
            </tbody>
          </Table>
          <Alert variant="light" className="mb-0 mt-3">
            <p className="mb-0"><small>
              <i className="bi bi-info-circle me-1"></i>
              Jika nilai pembagi normalisasi adalah 0, maka hasil normalisasi juga 0 untuk menghindari pembagian dengan nol.
            </small></p>
          </Alert>
        </Card.Body>
      </Card>

      {/* Langkah 4: Matriks Keputusan Ternormalisasi Berbobot */}
      <Card className="mb-4">
        <Card.Header className="bg-primary text-white">
          <h5 className="mb-0">Langkah 4: Matriks Keputusan Ternormalisasi Berbobot (V)</h5>
        </Card.Header>
        <Card.Body>
          <Alert variant="secondary">
            <strong>Rumus Normalisasi Berbobot:</strong>
            <div className="text-center my-2">
              <code>v<sub>ij</sub> = w<sub>j</sub> &times; r<sub>ij</sub></code>
            </div>
            <p className="mb-0">Dimana w<sub>j</sub> adalah bobot kriteria, dan r<sub>ij</sub> adalah nilai ternormalisasi.</p>
          </Alert>
          <Table striped bordered hover responsive className="mt-2">
            <thead className="table-light">
              <tr>
                <th>Atlet</th>
                {criterias.map(c => <th key={c}>{c.toUpperCase()} (w={safeToFixed(weights[c],2)})</th>)}
              </tr>
            </thead>
            <tbody>
              {weightedResults.map((result, index) => (
                <tr key={index}>
                  <td>{result.name}</td>
                  {criterias.map(c => <td key={c}>{safeToFixed(result[c], 6)}</td>)}
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Langkah 5: Solusi Ideal Positif dan Negatif */}
       <Card className="mb-4">
        <Card.Header className="bg-primary text-white">
          <h5 className="mb-0">Langkah 5: Solusi Ideal Positif (A+) dan Negatif (A-)</h5>
        </Card.Header>
        <Card.Body>
          <Alert variant="secondary">
            <p className="mb-0">
              <strong>Solusi ideal positif (A+)</strong>: <code>A<sup>+</sup> = &#123;max(v<sub>ij</sub>)&#125;</code> untuk kriteria benefit (semua kriteria di sini dianggap benefit).
              <br />
              <strong>Solusi ideal negatif (A-)</strong>: <code>A<sup>-</sup> = &#123;min(v<sub>ij</sub>)&#125;</code> untuk kriteria benefit.
            </p>
          </Alert>
          <Table striped bordered hover responsive className="mb-4 mt-3">
            <thead className="table-light">
              <tr>
                <th>Solusi Ideal</th>
                {criterias.map(c => <th key={c}>{c.toUpperCase()}</th>)}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Positif (A+)</strong></td>
                {criterias.map(c => <td key={c}>{safeToFixed(positiveIdeal[c], 6)}</td>)}
              </tr>
              <tr>
                <td><strong>Negatif (A-)</strong></td>
                {criterias.map(c => <td key={c}>{safeToFixed(negativeIdeal[c], 6)}</td>)}
              </tr>
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Langkah 6: Jarak ke Solusi Ideal */}
      <Card className="mb-4">
        <Card.Header className="bg-primary text-white">
          <h5 className="mb-0">Langkah 6: Jarak ke Solusi Ideal (D+ dan D-)</h5>
        </Card.Header>
        <Card.Body>
          <Alert variant="secondary">
            <strong>Rumus jarak Euclidean:</strong>
            <div className="my-2">
              Jarak ke Solusi Ideal Positif: <code>D<sub>i</sub><sup>+</sup> = &radic;(&Sigma;(v<sub>ij</sub> - v<sub>j</sub><sup>+</sup>)<sup>2</sup>)</code>
            </div>
            <div className="my-2">
              Jarak ke Solusi Ideal Negatif: <code>D<sub>i</sub><sup>-</sup> = &radic;(&Sigma;(v<sub>ij</sub> - v<sub>j</sub><sup>-</sup>)<sup>2</sup>)</code>
            </div>
          </Alert>
          <Table striped bordered hover responsive className="mt-3">
            <thead className="table-light">
              <tr>
                <th>Atlet</th>
                <th>Jarak ke A+ (D<sub>i</sub><sup>+</sup>)</th>
                <th>Jarak ke A- (D<sub>i</sub><sup>-</sup>)</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(positiveDistances).map((name, index) => (
                <tr key={index}>
                  <td>{name}</td>
                  <td>{safeToFixed(positiveDistances[name], 6)}</td>
                  <td>{safeToFixed(negativeDistances[name], 6)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Langkah 7: Kedekatan Relatif */}
      <Card className="mb-4">
        <Card.Header className="bg-primary text-white">
          <h5 className="mb-0">Langkah 7: Kedekatan Relatif Terhadap Solusi Ideal (C<sub>i</sub>)</h5>
        </Card.Header>
        <Card.Body>
          <Alert variant="secondary">
            <strong>Rumus kedekatan relatif:</strong>
            <div className="text-center my-2">
              <code>C<sub>i</sub> = D<sub>i</sub><sup>-</sup> / (D<sub>i</sub><sup>+</sup> + D<sub>i</sub><sup>-</sup>)</code>
            </div>
            <p className="mb-0">
              Semakin dekat nilai C<sub>i</sub> ke 1, semakin baik alternatif tersebut. Nilai C<sub>i</sub> berkisar antara 0 dan 1.
            </p>
          </Alert>
          <Table striped bordered hover responsive className="mt-3">
            <thead className="table-light">
              <tr>
                <th>Atlet</th>
                <th>Kedekatan Relatif (C<sub>i</sub>)</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(relativeCloseness).map(([name, value], index) => (
                <tr key={index}>
                  <td>{name}</td>
                  <td>{safeToFixed(value, 6)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Langkah 8: Peringkat Atlet */}
      <Card className="mb-4">
        <Card.Header className="bg-success text-white">
          <h5 className="mb-0">Langkah 8: Peringkat Atlet (Final)</h5>
        </Card.Header>
        <Card.Body>
          <Alert variant="secondary">
            <p className="mb-0">
              Peringkat ditentukan berdasarkan nilai kedekatan relatif (C<sub>i</sub>), dimana nilai yang lebih tinggi menunjukkan atlet yang lebih baik.
            </p>
          </Alert>
          <Table striped bordered hover responsive className="mt-2">
            <thead className="table-light">
              <tr>
                <th>Peringkat</th>
                <th>Atlet</th>
                <th>Nilai (C<sub>i</sub>)</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {rankings.map((rank, index) => (
                <tr key={index} className={rank.rank === 1 ? 'table-success fw-bold' : ''}>
                  <td><strong>{rank.rank}</strong></td>
                  <td>{rank.name}</td>
                  <td>{safeToFixed(rank.score, 3)}</td>
                  <td>
                    <Badge bg={
                      rank.status === 'Istimewa' ? 'success' :
                        rank.status === 'Baik' ? 'primary' :
                          rank.status === 'Cukup' ? 'warning' : 'danger'
                    }>
                      {rank.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Alert variant="light" className="mb-0 mt-3">
            <p className="mb-0"><small>
              <i className="bi bi-info-circle me-1"></i>
              Status penilaian: Istimewa (&gt;0.75), Baik (0.5-0.75), Cukup (0.25-0.5), Kurang (&lt;0.25). Skor dibulatkan ke 3 desimal.
            </small></p>
          </Alert>
        </Card.Body>
      </Card>

      {/* Kesimpulan */}
      {rankings.length > 0 && (
        <Card className="mb-4">
          <Card.Header className="bg-info text-white">
            <h5 className="mb-0">Kesimpulan Perhitungan Sampel</h5>
          </Card.Header>
          <Card.Body>
            <p>
              Berdasarkan perhitungan TOPSIS pada data sampel di atas, <strong>{rankings[0].name}</strong> menempati peringkat pertama dengan nilai kedekatan relatif
              <strong> {safeToFixed(rankings[0].score, 3)}</strong> dan status <Badge bg={
                rankings[0].status === 'Istimewa' ? 'success' :
                  rankings[0].status === 'Baik' ? 'primary' :
                    rankings[0].status === 'Cukup' ? 'warning' : 'danger'
              }>{rankings[0].status}</Badge>.
            </p>
            <p className="mb-0">
              Perhitungan ini mendemonstrasikan bagaimana metode TOPSIS dapat digunakan untuk menilai dan merangking performa atlet secara objektif berdasarkan berbagai kriteria.
            </p>
          </Card.Body>
        </Card>
      )}
       <Alert variant="warning" className="mb-4">
        <h6 className="mb-2"><i className="bi bi-exclamation-triangle-fill me-2"></i>Catatan Penting:</h6>
        <ul className="mb-0">
          <li>Perhitungan di halaman ini menggunakan <strong>data sampel statis</strong> yang ada di dalam kode frontend (diambil dari PDF) untuk tujuan demonstrasi dan verifikasi langkah-langkah TOPSIS.</li>
          <li>Hasil di sini mungkin berbeda dari peringkat atlet aktual di sistem yang menggunakan data dinamis dari database.</li>
          <li>Bobot kriteria dihitung berdasarkan target minimal yang didefinisikan (sesuai logika backend).</li>
          <li>Nilai 0 pada data atlet menandakan tidak ada evaluasi atau skor nol pada jenis latihan tersebut untuk data sampel ini.</li>
        </ul>
      </Alert>
    </Container>
  );
};

export default TopsisCalculation;
