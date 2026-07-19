import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Presentation from "./components/Presentation";
import Objectifs from "./components/Objectifs";
import Coachs from "./components/Coachs";
import Footer from "./components/Footer";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Espace from "./pages/Espace";
import AdminDashboard from "./pages/AdminDashboard";
import CoachDashboard from "./pages/CoachDashboard";
import StudentDashboard from "./pages/StudentDashboard";

function HomePage() {
  return (
    <>
      <Hero />
      <Presentation />
      <Objectifs />
      <Coachs />
    </>
  );
}

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/inscription" element={<Signup />} />
        <Route path="/connexion" element={<Login />} />
        <Route path="/espace" element={<Espace />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/coach" element={<CoachDashboard />} />
        <Route path="/etudiant" element={<StudentDashboard />} />
      </Routes>
      <Footer />
    </>
  );
}
