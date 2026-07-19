import { Navigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { COLORS } from "../data";

export default function Espace() {
  const { user, profile, loading } = useAuth();

  if (loading) {
    return (
      <p style={{ color: COLORS.text }} className="text-center py-20">
        Chargement...
      </p>
    );
  }

  if (!user) {
    return <Navigate to="/connexion" replace />;
  }

  if (!profile) {
    return (
      <p style={{ color: COLORS.text }} className="text-center py-20">
        Chargement du profil...
      </p>
    );
  }

  if (profile.role === "admin") return <Navigate to="/admin" replace />;
  if (profile.role === "coach") return <Navigate to="/coach" replace />;
  return <Navigate to="/etudiant" replace />;
}
