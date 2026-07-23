import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { COLORS } from "../data";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    loadProfiles();
    loadAssignments();
  }, []);

  async function loadProfiles() {
    setLoading(true);
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setProfiles(data);
    setLoading(false);
  }

  async function loadAssignments() {
    const { data, error } = await supabase
      .from("assignments")
      .select(
        "id, status, ended_at, end_reason, student:profiles!assignments_student_id_fkey(full_name), coach:profiles!assignments_coach_id_fkey(full_name)",
      )
      .order("created_at", { ascending: false });

    if (!error) setAssignments(data);
  }

  const students = profiles.filter((p) => p.role === "student");
  const coaches = profiles.filter((p) => p.role === "coach");

  async function assignCoach(studentId, coachId) {
    if (!coachId) return;
    const { error } = await supabase
      .from("assignments")
      .insert({ student_id: studentId, coach_id: coachId });

    if (error) {
      if (error.code === "23505") {
        alert("Ce coach est déjà assigné à cet étudiant.");
      } else {
        alert("Erreur : " + error.message);
      }
    } else {
      alert("Coach assigné !");
      loadProfiles();
    }
  }

  async function makeCoach(profileId) {
    const { error } = await supabase
      .from("profiles")
      .update({ role: "coach" })
      .eq("id", profileId);

    if (!error) loadProfiles();
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
        Espace admin
      </h1>

      <h2 className="text-xl mb-4" style={{ color: COLORS.text }}>
        Inscrits ({students.length})
      </h2>
      <div className="flex flex-col gap-3 mb-12">
        {students.map((s) => (
          <div
            key={s.id}
            className="flex items-center justify-between rounded-lg p-4"
            style={{
              background: COLORS.bgAlt,
              border: `1px solid ${COLORS.steel}`,
            }}
          >
            <span style={{ color: COLORS.text }}>{s.full_name || s.id}</span>
            <div className="flex items-center gap-2">
              <select
                onChange={(e) => assignCoach(s.id, e.target.value)}
                defaultValue=""
                className="px-3 py-2 rounded-lg text-sm"
                style={{
                  background: COLORS.bg,
                  color: COLORS.text,
                  border: `1px solid ${COLORS.steel}`,
                }}
              >
                <option value="" disabled>
                  Assigner un coach
                </option>
                {coaches.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.full_name}
                  </option>
                ))}
              </select>
              <button
                onClick={() => makeCoach(s.id)}
                className="text-xs px-3 py-2 rounded-lg"
                style={{ border: `1px solid ${COLORS.red}`, color: COLORS.red }}
              >
                Passer coach
              </button>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-xl mb-4" style={{ color: COLORS.text }}>
        Coachs ({coaches.length})
      </h2>
      <div className="flex flex-col gap-3">
        {coaches.map((c) => (
          <div
            key={c.id}
            className="rounded-lg p-4"
            style={{
              background: COLORS.bgAlt,
              border: `1px solid ${COLORS.steel}`,
            }}
          >
            <span style={{ color: COLORS.text }}>{c.full_name}</span>
          </div>
        ))}
      </div>
      <h2 className="text-xl mb-4 mt-12" style={{ color: COLORS.text }}>
        Conversations
      </h2>
      <div className="flex flex-col gap-3">
        {assignments.map((a) => (
          <Link
            key={a.id}
            to={`/chat/${a.id}`}
            className="flex items-center justify-between rounded-lg p-4"
            style={{
              background: COLORS.bgAlt,
              border: `1px solid ${COLORS.steel}`,
            }}
          >
            <span style={{ color: COLORS.text }}>
              {a.student?.full_name} ↔ {a.coach?.full_name}
            </span>
            <span
              className="text-xs"
              style={{
                color: a.status === "active" ? COLORS.red : COLORS.textMuted,
              }}
            >
              {a.status === "active"
                ? "Active"
                : `Terminée — ${a.end_reason || "sans raison"}`}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
