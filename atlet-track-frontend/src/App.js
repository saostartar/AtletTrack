// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Navbar from "./components/common/Navbar";
import ProtectedRoute from "./components/common/ProtectedRoute";
import AdminLogin from "./pages/Login/AdminLogin";
import KoordinatorLogin from "./pages/Login/KoordinatorLogin";
import AtletLogin from "./pages/Login/AtletLogin";
import AdminDashboard from "./components/admin/AdminDashboard";
import KoordinatorDashboard from "./components/koordinator/KoordinatorDashboard";
import AtletDashboard from "./components/atlet/AtletDashboard";
import NotFound from "./pages/NotFound";
import KoordinatorManagement from "./pages/admin/KoordinatorManagement";
import ActivityLogs from "./pages/admin/ActivityLogs";
import Home from "./pages/Home";
import AtletManagement from "./pages/koordinator/AtletManagement";
import PesanAtlet from "./pages/koordinator/PesanAtlet";
import EvaluasiAtlet from "./pages/koordinator/EvaluasiAtlet";
import Pencapaian from "./pages/koordinator/Pencapaian";
import Evaluations from "./pages/atlet/Evaluations";
import Profile from "./pages/atlet/Profile";
import Communication from "./pages/atlet/Communication";
import Achievements from "./pages/atlet/Achievements";
import Layout from "./components/layout/layout.js";
import KatalogLatihan from "./pages/koordinator/KatalogLatihan";
import KatalogLatihanAtlet from "./pages/atlet/KatalogLatihanAtlet.js";
import OpsiLatihan from "./pages/koordinator/OpsiLatihan";
import KatalogDetail from "./pages/atlet/KatalogDetail";
import Latihan from "./pages/atlet/Latihan";
import LatihanHistory from "./pages/atlet/LatihanHistory";
import PerformaAtlet from "./pages/koordinator/PerformaAtlet";
import BestAthletes from "./pages/koordinator/BestAthletes";
import AthleteAnalysis from "./pages/koordinator/AthleteAnalysis";
import TopsisCalculation from "./pages/admin/TopsisCalculation";


function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Layout>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login/admin" element={<AdminLogin />} />
            <Route path="/login/koordinator" element={<KoordinatorLogin />} />
            <Route path="/login/atlet" element={<AtletLogin />} />

            {/* Protected Routes for Admin */}
            <Route element={<ProtectedRoute roles={["admin"]} />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route
                path="/admin/koordinators"
                element={<KoordinatorManagement />}
              />
              <Route path="/admin/activity-logs" element={<ActivityLogs />} />
               <Route path="/admin/topsis" element={<TopsisCalculation />} />
              {/* Add more admin routes here */}
            </Route>

            {/* Protected Routes for Koordinator */}
            <Route element={<ProtectedRoute roles={["koordinator"]} />}>
              <Route
                path="/koordinator/dashboard"
                element={<KoordinatorDashboard />}
              />
              <Route path="/koordinator/atlets" element={<AtletManagement />} />
              <Route path="/koordinator/pesan-atlet" element={<PesanAtlet />} />
              <Route
                path="/koordinator/evaluasi-atlet"
                element={<EvaluasiAtlet />}
              />
              <Route path="/koordinator/pencapaian" element={<Pencapaian />} />
              <Route
                path="/koordinator/katalog-latihan"
                element={<KatalogLatihan />}
              />
              <Route
                path="/koordinator/opsi-latihan"
                element={<OpsiLatihan />}
              />
              <Route path="koordinator/analytics" element={<PerformaAtlet />} />
              <Route path="/koordinator/best-athletes" element={<BestAthletes />} />
              <Route path="/koordinator/athletes/:id/analysis" element={<AthleteAnalysis />} />
              {/* Add more koordinator routes here */}
            </Route>

            {/* Protected Routes for Atlet */}
            <Route element={<ProtectedRoute roles={["atlet"]} />}>
              <Route path="/atlet/dashboard" element={<AtletDashboard />} />
              <Route path="/atlet/catalog" element={<KatalogLatihanAtlet />} />
              <Route path="/atlet/catalog/:id" element={<KatalogDetail />} />
              <Route path="/atlet/evaluations" element={<Evaluations />} />
              <Route path="/atlet/profile" element={<Profile />} />
              <Route path="/atlet/achivement" element={<Achievements />} />
              <Route path="/atlet/communication" element={<Communication />} />
              <Route path="/atlet/latihan/:katalogId" element={<Latihan />} />
              <Route
                path="/atlet/latihan/history"
                element={<LatihanHistory />}
              />
              {/* Add more atlet routes here */}
            </Route>

            {/* Home Route */}
            <Route
              path="/"
              element={
                <h1 className="text-center mt-5">
                  Welcome to Athlete Monitoring
                </h1>
              }
            />

            {/* 404 Not Found */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;
