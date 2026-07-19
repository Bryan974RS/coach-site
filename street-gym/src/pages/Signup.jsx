import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { COLORS } from "../data";

export default function Signup() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
      },
    });

    if (error) {
      setError(error.message);
      return;
    }

    navigate("/connexion");
  }

  return (
    <div className="max-w-md mx-auto px-6 py-20">
      <h1 className="text-3xl mb-8" style={{ color: COLORS.text }}>
        Créer un compte
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Nom complet"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
          className="px-4 py-3 rounded-lg"
          style={{
            background: COLORS.bgAlt,
            color: COLORS.text,
            border: `1px solid ${COLORS.steel}`,
          }}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="px-4 py-3 rounded-lg"
          style={{
            background: COLORS.bgAlt,
            color: COLORS.text,
            border: `1px solid ${COLORS.steel}`,
          }}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
          className="px-4 py-3 rounded-lg"
          style={{
            background: COLORS.bgAlt,
            color: COLORS.text,
            border: `1px solid ${COLORS.steel}`,
          }}
        />
        {error && <p style={{ color: COLORS.red }}>{error}</p>}
        <button
          type="submit"
          className="font-semibold px-6 py-3 rounded-full"
          style={{ background: COLORS.red, color: "#0B0B0C" }}
        >
          S'inscrire
        </button>
      </form>
    </div>
  );
}
