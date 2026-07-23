import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { useAuth } from "../AuthContext";
import { COLORS } from "../data";

export default function StudentDashboard() {
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
        "id, status, coach:profiles!assignments_coach_id_fkey(id, full_name)",
      )
      .eq("student_id", user.id)
      .eq("status", "active");

    if (!error) setAssignments(data);
    setLoading(false);
  }

  async function stopCoach(assignmentId) {
    const reason = prompt("Pourquoi tu arrêtes avec ce coach ? (optionnel)");

    const { error } = await supabase
      .from("assignments")
      .update({
        status: "ended",
        end_reason: reason || null,
        ended_at: new Date().toISOString(),
      })
      .eq("id", assignmentId);

    if (error) {
      alert("Erreur : " + error.message);
    } else {
      loadAssignments();
    }
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
        Mon espace
      </h1>

      {assignments.length === 0 && (
        <p style={{ color: COLORS.textMuted }}>
          Aucun coach assigné pour l'instant. Un admin doit t'en attribuer un.
        </p>
      )}

      <div className="flex flex-col gap-3">
        {assignments.map((a) => (
          <div
            key={a.id}
            className="rounded-lg p-4 flex items-center justify-between"
            style={{
              background: COLORS.bgAlt,
              border: `1px solid ${COLORS.steel}`,
            }}
          >
            <span style={{ color: COLORS.text }}>{a.coach?.full_name}</span>
            <div className="flex items-center gap-3">
              <Link
                to={`/chat/${a.id}`}
                className="text-sm"
                style={{ color: COLORS.red }}
              >
                Ouvrir le chat →
              </Link>
              <button
                onClick={() => stopCoach(a.id)}
                className="text-xs px-3 py-2 rounded-lg"
                style={{
                  border: `1px solid ${COLORS.steel}`,
                  color: COLORS.textMuted,
                }}
              >
                Arrêter avec ce coach
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
