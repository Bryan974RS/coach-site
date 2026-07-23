import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { useAuth } from "../AuthContext";
import { COLORS } from "../data";

export default function CoachDashboard() {
  const { user } = useAuth();
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) loadAssignments();
  }, [user]);

  async function loadAssignments() {
    setLoading(true);
    const { data, error } = await supabase
      .from("assignments")
      .select(
        "id, status, student:profiles!assignments_student_id_fkey(id, full_name)",
      )
      .eq("coach_id", user.id)
      .eq("status", "active");

    if (!error) setAssignments(data);
    setLoading(false);
  }

  if (loading) {
    return (
      <p style={{ color: COLORS.text }} className="text-center py-20">
        Chargement...
      </p>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      <h1 className="text-3xl mb-10" style={{ color: COLORS.text }}>
        Mes étudiants
      </h1>
      {assignments.length === 0 && (
        <p style={{ color: COLORS.textMuted }}>
          Aucun étudiant assigné pour l'instant.
        </p>
      )}
      <div className="flex flex-col gap-3">
        {assignments.map((a) => (
          <Link
            key={a.id}
            to={`/chat/${a.id}`}
            className="rounded-lg p-4 flex items-center justify-between"
            style={{
              background: COLORS.bgAlt,
              border: `1px solid ${COLORS.steel}`,
            }}
          >
            <span style={{ color: COLORS.text }}>{a.student?.full_name}</span>
            <span className="text-sm" style={{ color: COLORS.red }}>
              Ouvrir le chat →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
