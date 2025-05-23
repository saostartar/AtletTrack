import { Container, Card, Table, Row, Col, Badge, Alert, } from 'react-bootstrap';

const TopsisCalculation = () => {
  // Data evaluasi atlet dari CSV
  const athleteData = [
    { name: 'Christian Timothy', ketahanan: 61.5, kekuatan: 56.5, kecepatan: 0, kelincahan: 0, koordinasi: 76.7 },
    { name: 'Fernando Fransco', ketahanan: 70.5, kekuatan: 0, kecepatan: 0, kelincahan: 0, koordinasi: 0 },
    { name: 'Claudio Yeheskiel', ketahanan: 66, kekuatan: 0, kecepatan: 0, kelincahan: 0, koordinasi: 0 },
  ];
  
  // Definisi jenis latihan dan target minimal
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

  // Hitung bobot kriteria berdasarkan target minimal
  const calculateWeights = () => {
    const targetValues = {};
    let totalTargetValue = 0;
    
    for (const [type, data] of Object.entries(JENIS_LATIHAN)) {
      targetValues[type.toLowerCase()] = data.targetMinimal;
      totalTargetValue += data.targetMinimal;
    }
    
    const weights = {};
    for (const [type, value] of Object.entries(targetValues)) {
      weights[type] = parseFloat((value / totalTargetValue).toFixed(2));
    }
    
    return weights;
  };
  
  // Bobot kriteria yang dihitung berdasarkan target minimal
  const weights = calculateWeights();
  
  // Hitung akar kuadrat dari jumlah kuadrat setiap kolom
  const calculateColumnNorms = () => {
    const criterias = ['ketahanan', 'kekuatan', 'kecepatan', 'kelincahan', 'koordinasi'];
    const norms = {};
    
    criterias.forEach(criteria => {
      let sumOfSquares = 0;
      athleteData.forEach(athlete => {
        sumOfSquares += Math.pow(athlete[criteria], 2);
      });
      norms[criteria] = Math.sqrt(sumOfSquares);
    });
    
    return norms;
  };
  
  // Akar kuadrat dari jumlah kuadrat setiap kolom
  const columnNorms = calculateColumnNorms();
  
  // Hasil perhitungan normalisasi
  const calculateNormalization = () => {
    const criterias = ['ketahanan', 'kekuatan', 'kecepatan', 'kelincahan', 'koordinasi'];
    
    return athleteData.map(athlete => {
      const normalized = { name: athlete.name };
      
      criterias.forEach(criteria => {
        if (columnNorms[criteria] === 0) {
          normalized[criteria] = 0;
        } else {
          normalized[criteria] = athlete[criteria] / columnNorms[criteria];
        }
      });
      
      return normalized;
    });
  };
  
  const normalizationResults = calculateNormalization();
  
  // Hasil perhitungan normalisasi terbobot
  const calculateWeightedNormalization = () => {
    const criterias = ['ketahanan', 'kekuatan', 'kecepatan', 'kelincahan', 'koordinasi'];
    
    return normalizationResults.map(result => {
      const weighted = { name: result.name };
      
      criterias.forEach(criteria => {
        weighted[criteria] = result[criteria] * weights[criteria];
      });
      
      return weighted;
    });
  };
  
  const weightedResults = calculateWeightedNormalization();
  
  // Solusi ideal positif dan negatif
  const calculateIdealSolutions = () => {
    const criterias = ['ketahanan', 'kekuatan', 'kecepatan', 'kelincahan', 'koordinasi'];
    const positiveIdeal = {};
    const negativeIdeal = {};
    
    criterias.forEach(criteria => {
      let max = -Infinity;
      let min = Infinity;
      
      weightedResults.forEach(result => {
        if (result[criteria] > max) max = result[criteria];
        if (result[criteria] < min) min = result[criteria];
      });
      
      positiveIdeal[criteria] = max;
      negativeIdeal[criteria] = min;
    });
    
    return { positiveIdeal, negativeIdeal };
  };
  
  const { positiveIdeal, negativeIdeal } = calculateIdealSolutions();
  
  // Hitung jarak ke solusi ideal
  const calculateDistances = () => {
    const criterias = ['ketahanan', 'kekuatan', 'kecepatan', 'kelincahan', 'koordinasi'];
    const positiveDistances = {};
    const negativeDistances = {};
    
    weightedResults.forEach(result => {
      let positiveSum = 0;
      let negativeSum = 0;
      
      criterias.forEach(criteria => {
        positiveSum += Math.pow(result[criteria] - positiveIdeal[criteria], 2);
        negativeSum += Math.pow(result[criteria] - negativeIdeal[criteria], 2);
      });
      
      positiveDistances[result.name] = Math.sqrt(positiveSum);
      negativeDistances[result.name] = Math.sqrt(negativeSum);
    });
    
    return { positiveDistances, negativeDistances };
  };
  
  const { positiveDistances, negativeDistances } = calculateDistances();
  
  // Kedekatan relatif
  const calculateRelativeCloseness = () => {
    const closeness = {};
    
    Object.keys(positiveDistances).forEach(name => {
      const denominator = positiveDistances[name] + negativeDistances[name];
      if (denominator === 0) {
        closeness[name] = 0;
      } else {
        closeness[name] = negativeDistances[name] / denominator;
      }
    });
    
    return closeness;
  };
  
  const relativeCloseness = calculateRelativeCloseness();
  
  // Peringkat akhir
  const calculateRankings = () => {
    const ranks = Object.entries(relativeCloseness).map(([name, score]) => ({ 
      name, 
      score: parseFloat(score.toFixed(3)) 
    }));
    
    ranks.sort((a, b) => b.score - a.score);
    
    return ranks.map((item, index) => ({
      rank: index + 1,
      name: item.name,
      score: item.score,
      status: item.score > 0.75 ? 'Istimewa' : 
              item.score > 0.5 ? 'Baik' : 
              item.score > 0.25 ? 'Cukup' : 'Kurang'
    }));
  };
  
  const rankings = calculateRankings();
  
  return (
    <Container className="mt-4 mb-5">
      <Alert variant="info" className="mb-4">
        <i className="bi bi-info-circle-fill me-2"></i>
        Halaman ini hanya dapat diakses oleh administrator sistem.
      </Alert>
      
      <h1 className="mb-4 text-center">Perhitungan TOPSIS untuk Menentukan Atlet Terbaik</h1>
      
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
            <li>Normalisasi matriks keputusan</li>
            <li>Menghitung matriks keputusan ternormalisasi berbobot</li>
            <li>Menentukan solusi ideal positif dan negatif</li>
            <li>Menghitung jarak setiap alternatif dari solusi ideal</li>
            <li>Menghitung kedekatan relatif terhadap solusi ideal</li>
            <li>Menentukan peringkat alternatif berdasarkan kedekatan relatif</li>
          </ol>
        </Card.Body>
      </Card>
      
      <Row className="mb-4">
        <Col md={6}>
          <Card className="h-100">
            <Card.Header className="bg-primary text-white">
              <h5 className="mb-0">Langkah 1: Data Evaluasi Atlet</h5>
            </Card.Header>
            <Card.Body>
              <Table striped bordered hover responsive>
                <thead className="table-light">
                  <tr>
                    <th>Atlet</th>
                    <th>KETAHANAN</th>
                    <th>KEKUATAN</th>
                    <th>KECEPATAN</th>
                    <th>KELINCAHAN</th>
                    <th>KOORDINASI</th>
                  </tr>
                </thead>
                <tbody>
                  {athleteData.map((athlete, index) => (
                    <tr key={index}>
                      <td>{athlete.name}</td>
                      <td>{athlete.ketahanan}</td>
                      <td>{athlete.kekuatan}</td>
                      <td>{athlete.kecepatan}</td>
                      <td>{athlete.kelincahan}</td>
                      <td>{athlete.koordinasi}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Alert variant="light" className="mb-0 mt-3">
                <p className="mb-0"><small>
                  <i className="bi bi-info-circle me-1"></i> 
                  Data di atas merupakan skor rata-rata evaluasi atlet untuk setiap jenis latihan.
                  Nilai 0 menunjukkan tidak ada evaluasi untuk jenis latihan tersebut.
                </small></p>
              </Alert>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="h-100">
            <Card.Header className="bg-primary text-white">
              <h5 className="mb-0">Langkah 2: Bobot Kriteria</h5>
            </Card.Header>
            <Card.Body>
              <Alert variant="secondary" className="mb-3">
                <p className="mb-0">
                  <strong>Metode Penentuan Bobot:</strong> Bobot setiap kriteria dihitung berdasarkan nilai target minimal untuk setiap jenis latihan.
                </p>
              </Alert>
              
              <Table striped bordered hover responsive>
                <thead className="table-light">
                  <tr>
                    <th>Kriteria</th>
                    <th>Target Minimal</th>
                    <th>Bobot</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(JENIS_LATIHAN).map(([type, data], index) => (
                    <tr key={index}>
                      <td>{type}</td>
                      <td>{data.targetMinimal}</td>
                      <td>{weights[type.toLowerCase()]}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              
              <Alert variant="light" className="mb-0 mt-3">
                <p className="mb-0"><small>
                  <i className="bi bi-info-circle me-1"></i> 
                  Bobot = Target Minimal / Total Target Minimal (semua jenis latihan)
                </small></p>
              </Alert>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <Card className="mb-4">
        <Card.Header className="bg-primary text-white">
          <h5 className="mb-0">Langkah 3: Normalisasi Matriks Keputusan</h5>
        </Card.Header>
        <Card.Body>
          <Alert variant="secondary">
            <strong>Rumus Normalisasi:</strong>
            <div className="text-center my-2">
              <code>r<sub>ij</sub> = x<sub>ij</sub> / sqrt(Σ(x<sub>ij</sub>)²)</code>
            </div>
            <p className="mb-0">Dimana r<sub>ij</sub> adalah nilai ternormalisasi, dan x<sub>ij</sub> adalah nilai asli.</p>
          </Alert>
          
          <h6 className="mt-4">Pertama, hitung akar kuadrat dari jumlah kuadrat setiap kolom:</h6>
          <Table striped bordered hover responsive size="sm">
            <thead className="table-light">
              <tr>
                <th>KETAHANAN</th>
                <th>KEKUATAN</th>
                <th>KECEPATAN</th>
                <th>KELINCAHAN</th>
                <th>KOORDINASI</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{columnNorms.ketahanan.toFixed(4)}</td>
                <td>{columnNorms.kekuatan.toFixed(4)}</td>
                <td>{columnNorms.kecepatan.toFixed(4)}</td>
                <td>{columnNorms.kelincahan.toFixed(4)}</td>
                <td>{columnNorms.koordinasi.toFixed(4)}</td>
              </tr>
            </tbody>
          </Table>
          
          <h6 className="mt-3">Selanjutnya, normalisasi setiap nilai:</h6>
          <Table striped bordered hover responsive className="mt-2">
            <thead className="table-light">
              <tr>
                <th>Atlet</th>
                <th>KETAHANAN</th>
                <th>KEKUATAN</th>
                <th>KECEPATAN</th>
                <th>KELINCAHAN</th>
                <th>KOORDINASI</th>
              </tr>
            </thead>
            <tbody>
              {normalizationResults.map((result, index) => (
                <tr key={index}>
                  <td>{result.name}</td>
                  <td>{result.ketahanan.toFixed(6)}</td>
                  <td>{result.kekuatan.toFixed(6)}</td>
                  <td>{result.kecepatan.toFixed(6)}</td>
                  <td>{result.kelincahan.toFixed(6)}</td>
                  <td>{result.koordinasi.toFixed(6)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          
          <Alert variant="light" className="mb-0 mt-3">
            <p className="mb-0"><small>
              <i className="bi bi-info-circle me-1"></i> 
              Jika nilai akar kuadrat adalah 0, maka hasil normalisasi juga 0 untuk menghindari pembagian dengan nol.
            </small></p>
          </Alert>
        </Card.Body>
      </Card>
      
      <Card className="mb-4">
        <Card.Header className="bg-primary text-white">
          <h5 className="mb-0">Langkah 4: Matriks Keputusan Ternormalisasi Berbobot</h5>
        </Card.Header>
        <Card.Body>
          <Alert variant="secondary">
            <strong>Rumus Normalisasi Berbobot:</strong>
            <div className="text-center my-2">
              <code>v<sub>ij</sub> = w<sub>j</sub> × r<sub>ij</sub></code>
            </div>
            <p className="mb-0">Dimana w<sub>j</sub> adalah bobot kriteria, dan r<sub>ij</sub> adalah nilai ternormalisasi.</p>
          </Alert>
          
          <h6 className="mt-4">Kalikan setiap nilai ternormalisasi dengan bobot kriteria masing-masing:</h6>
          <Table striped bordered hover responsive className="mt-2">
            <thead className="table-light">
              <tr>
                <th>Atlet</th>
                <th>KETAHANAN</th>
                <th>KEKUATAN</th>
                <th>KECEPATAN</th>
                <th>KELINCAHAN</th>
                <th>KOORDINASI</th>
              </tr>
            </thead>
            <tbody>
              {weightedResults.map((result, index) => (
                <tr key={index}>
                  <td>{result.name}</td>
                  <td>{result.ketahanan.toFixed(6)}</td>
                  <td>{result.kekuatan.toFixed(6)}</td>
                  <td>{result.kecepatan.toFixed(6)}</td>
                  <td>{result.kelincahan.toFixed(6)}</td>
                  <td>{result.koordinasi.toFixed(6)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
      
      <Row className="mb-4">
        <Col md={6}>
          <Card className="h-100">
            <Card.Header className="bg-primary text-white">
              <h5 className="mb-0">Langkah 5: Solusi Ideal Positif dan Negatif</h5>
            </Card.Header>
            <Card.Body>
              <Alert variant="secondary">
                <p className="mb-0">
                  <strong>Solusi ideal positif (A+)</strong> diambil dari nilai maksimum setiap kriteria.
                  <br />
                  <strong>Solusi ideal negatif (A-)</strong> diambil dari nilai minimum setiap kriteria.
                </p>
              </Alert>
              
              <Table striped bordered hover responsive className="mb-4 mt-3">
                <thead className="table-light">
                  <tr>
                    <th>Solusi Ideal</th>
                    <th>KETAHANAN</th>
                    <th>KEKUATAN</th>
                    <th>KECEPATAN</th>
                    <th>KELINCAHAN</th>
                    <th>KOORDINASI</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Positif (A+)</strong></td>
                    <td>{positiveIdeal.ketahanan.toFixed(6)}</td>
                    <td>{positiveIdeal.kekuatan.toFixed(6)}</td>
                    <td>{positiveIdeal.kecepatan.toFixed(6)}</td>
                    <td>{positiveIdeal.kelincahan.toFixed(6)}</td>
                    <td>{positiveIdeal.koordinasi.toFixed(6)}</td>
                  </tr>
                  <tr>
                    <td><strong>Negatif (A-)</strong></td>
                    <td>{negativeIdeal.ketahanan.toFixed(6)}</td>
                    <td>{negativeIdeal.kekuatan.toFixed(6)}</td>
                    <td>{negativeIdeal.kecepatan.toFixed(6)}</td>
                    <td>{negativeIdeal.kelincahan.toFixed(6)}</td>
                    <td>{negativeIdeal.koordinasi.toFixed(6)}</td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="h-100">
            <Card.Header className="bg-primary text-white">
              <h5 className="mb-0">Langkah 6: Jarak ke Solusi Ideal</h5>
            </Card.Header>
            <Card.Body>
              <Alert variant="secondary">
                <strong>Rumus jarak ke solusi ideal menggunakan jarak Euclidean:</strong>
                <div className="text-center my-2">
                  <code>D<sub>i</sub><sup>+</sup> = √(Σ(v<sub>ij</sub> - v<sub>j</sub><sup>+</sup>)²)</code>
                </div>
                
                <strong>Rumus jarak ke solusi ideal negatif:</strong>
                <div className="text-center my-2">
                  <code>D<sub>i</sub><sup>-</sup> = √(Σ(v<sub>ij</sub> - v<sub>j</sub><sup>-</sup>)²)</code>
                </div>
              </Alert>
              
              <Table striped bordered hover responsive className="mt-3">
                <thead className="table-light">
                  <tr>
                    <th>Atlet</th>
                    <th>Jarak ke A+</th>
                    <th>Jarak ke A-</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(positiveDistances).map((name, index) => (
                    <tr key={index}>
                      <td>{name}</td>
                      <td>{positiveDistances[name].toFixed(6)}</td>
                      <td>{negativeDistances[name].toFixed(6)}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <Row className="mb-4">
        <Col md={6}>
          <Card className="h-100">
            <Card.Header className="bg-primary text-white">
              <h5 className="mb-0">Langkah 7: Kedekatan Relatif Terhadap Solusi Ideal</h5>
            </Card.Header>
            <Card.Body>
              <Alert variant="secondary">
                <strong>Rumus kedekatan relatif:</strong>
                <div className="text-center my-2">
                  <code>C<sub>i</sub> = D<sub>i</sub><sup>-</sup> / (D<sub>i</sub><sup>+</sup> + D<sub>i</sub><sup>-</sup>)</code>
                </div>
                <p className="mb-0">
                  Semakin dekat nilai C<sub>i</sub> ke 1, semakin baik alternatif tersebut.
                </p>
              </Alert>
              
              <h6 className="mt-3">Perhitungan kedekatan relatif:</h6>
              <Table striped bordered hover responsive className="mt-3">
                <thead className="table-light">
                  <tr>
                    <th>Atlet</th>
                    <th>Kedekatan Relatif</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(relativeCloseness).map(([name, value], index) => (
                    <tr key={index}>
                      <td>{name}</td>
                      <td>{value.toFixed(6)}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="h-100">
            <Card.Header className="bg-primary text-white">
              <h5 className="mb-0">Langkah 8: Peringkat Atlet</h5>
            </Card.Header>
            <Card.Body>
              <Alert variant="secondary">
                <p className="mb-0">
                  Peringkat ditentukan berdasarkan nilai kedekatan relatif, dimana nilai yang lebih tinggi menunjukkan atlet yang lebih baik.
                </p>
              </Alert>
              
              <h6 className="mt-3">Hasil peringkat akhir:</h6>
              <Table striped bordered hover responsive className="mt-2">
                <thead className="table-light">
                  <tr>
                    <th>Peringkat</th>
                    <th>Atlet</th>
                    <th>Nilai</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {rankings.map((rank, index) => (
                    <tr key={index} className={rank.rank === 1 ? 'table-success' : ''}>
                      <td><strong>{rank.rank}</strong></td>
                      <td>{rank.name}</td>
                      <td>{rank.score.toFixed(3)}</td>
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
                  Status penilaian: Istimewa (&gt;0.75), Baik (0.5-0.75), Cukup (0.25-0.5), Kurang (&lt;0.25)
                </small></p>
              </Alert>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <Card className="mb-4">
        <Card.Header className="bg-primary text-white">
          <h5 className="mb-0">Kesimpulan</h5>
        </Card.Header>
        <Card.Body>
          <p>
            Berdasarkan perhitungan TOPSIS di atas, <strong>{rankings[0].name}</strong> menempati peringkat pertama dengan nilai kedekatan relatif 
            <strong> {rankings[0].score.toFixed(3)}</strong> dan status <Badge bg={
              rankings[0].status === 'Istimewa' ? 'success' : 
              rankings[0].status === 'Baik' ? 'primary' :
              rankings[0].status === 'Cukup' ? 'warning' : 'danger'
            }>{rankings[0].status}</Badge>. 
            Hasil ini menunjukkan bahwa {rankings[0].name} memiliki performa yang jauh lebih baik dibandingkan dengan atlet lainnya 
            berdasarkan kriteria-kriteria yang telah ditentukan.
          </p>
          <p className="mb-0">
            Metode TOPSIS membantu memberikan penilaian yang objektif terhadap performa atlet dengan mempertimbangkan 
            berbagai kriteria sekaligus. Perhitungan ini dapat digunakan sebagai dasar untuk pengambilan keputusan 
            terkait pembinaan atlet selanjutnya.
          </p>
        </Card.Body>
      </Card>
      
      <Alert variant="secondary" className="mb-4">
        <h6 className="mb-2">Catatan:</h6>
        <ul className="mb-0">
          <li>Perhitungan di atas dilakukan berdasarkan data sampel untuk tujuan demonstrasi</li>
          <li>Dalam implementasi sebenarnya, bobot kriteria dihitung berdasarkan target minimal setiap jenis latihan</li>
          <li>Nilai 0 pada data atlet menandakan tidak ada evaluasi pada jenis latihan tersebut</li>
          <li>Perhitungan lengkap dilakukan secara otomatis oleh sistem saat Anda memilih atlet untuk dianalisis</li>
        </ul>
      </Alert>
    </Container>
  );
};

export default TopsisCalculation;