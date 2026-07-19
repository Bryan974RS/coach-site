import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { COLORS } from "../data";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      return;
    }

    navigate("/espace");
  }

  return (
    <div className="max-w-md mx-auto px-6 py-20">
      <h1 className="text-3xl mb-8" style={{ color: COLORS.text }}>
        Se connecter
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
          Se connecter
        </button>
      </form>
    </div>
  );
}
