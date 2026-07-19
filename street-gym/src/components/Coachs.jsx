import { COLORS } from "../data";

const COACHES = [
  {
    name: "Kevin R.",
    spe: "Street Workout — Force & explosivité",
    initials: "KR",
  },
  {
    name: "Sofia B.",
    spe: "Street Workout — Mobilité & posture",
    initials: "SB",
  },
  {
    name: "Yann T.",
    spe: "Street Workout — Préparation compétition",
    initials: "YT",
  },
];

export default function Coachs() {
  return (
    <section id="coachs" className="max-w-6xl mx-auto px-6 py-20">
      <p
        className="text-sm font-semibold tracking-widest"
        style={{ color: COLORS.red }}
      >
        NOS COACHS
      </p>
      <h2
        className="mt-3 text-4xl md:text-5xl mb-4"
        style={{ color: COLORS.text }}
      >
        Choisis ton coach, démarre ton programme.
      </h2>
      <p className="mb-12 max-w-xl" style={{ color: COLORS.textMuted }}>
        Chaque coach a son propre programme et sa propre messagerie. Une fois
        inscrit, tu retrouves tout depuis ton compte.
      </p>
      <div className="grid md:grid-cols-3 gap-6">
        {COACHES.map((c) => (
          <div
            key={c.name}
            className="rounded-2xl p-6 flex flex-col items-start"
            style={{
              background: COLORS.bgAlt,
              border: `1px solid ${COLORS.steel}`,
            }}
          >
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center text-lg mb-4"
              style={{ background: COLORS.red, color: "#0B0B0C" }}
            >
              {c.initials}
            </div>
            <h3
              className="font-semibold text-lg"
              style={{ color: COLORS.text }}
            >
              {c.name}
            </h3>
            <p
              className="text-sm mt-1 mb-6"
              style={{ color: COLORS.textMuted }}
            >
              {c.spe}
            </p>
            <a
              href="#inscription"
              className="text-sm font-semibold px-4 py-2 rounded-full mt-auto"
              style={{ border: `1px solid ${COLORS.red}`, color: COLORS.red }}
            >
              Voir le profil
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
